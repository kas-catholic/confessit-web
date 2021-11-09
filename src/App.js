import React from 'react';
import './App.scss';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';
import {createSinsDb} from './data/sinsdb_en';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swiper from 'react-id-swiper';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import About from './About';
import Help from './Help';
import Prayers from './Prayers';
import AddButton from './AddButton';
import Translator from './service/translation/Translator';
import {enTranslations} from './data/translations/en';
import {deTranslations} from './data/translations/de';
import {elTranslations} from './data/translations/el';

class App extends React.Component {
  swiperParams = {
    slidesPerView: 1,
    spaceBetween: 5,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  };

  constructor(props) {
    super(props);


    let storedState = localStorage.getItem('state');
    if (storedState != null) {
      this.state = JSON.parse(storedState);
    } else {
      this.state = {
        selectedSinIds: [],
        customSins: [],
      };
    }

    if (!this.state.locale) {
      this.state.locale = 'en';
    }

    this.translator = new Translator();
    this.translator.addTranslationSet('en', enTranslations);
    this.translator.addTranslationSet('de', deTranslations);
    this.translator.addTranslationSet('el', elTranslations);
    this.sinsDb = createSinsDb(this.translator, this.state.locale);

    this.sinsById = new Map(this.sinsDb.sins.map(s =>
      [s.sin_id, s]
    ));

    // This binding is necessary to make `this` work in the callback
    this.addSinId = this.addSinId.bind(this);
    this.removeSinItem = this.removeSinItem.bind(this);
    this.addCustomSin = this.addCustomSin.bind(this);
    this.removeCustomSin = this.removeCustomSin.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.persistData = this.persistData.bind(this);
  }

  buildSinsList() {
    let sinIds = this.state.selectedSinIds;

    return sinIds.map(id =>
      ({
        id: id,
        text: this.sinsById.get(id).text_did
      })
    ).concat(
      this.state.customSins.map(text =>
        ({
          text: text
        })
      )
    );
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevState.locale !== this.state.locale) {
      this.sinsDb = createSinsDb(this.translator, this.state.locale);
      this.sinsById = new Map(this.sinsDb.sins.map(s =>
          [s.sin_id, s]
      ));
      this.forceUpdate();
    }
  }

  persistData() {
    // Yes, this is quick & dirty. But it works and it's simple.
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  addSinId(id) {
    this.setState(state => ({
      selectedSinIds: state.selectedSinIds.concat([id])
    }), this.persistData);
  }

  removeSinItem(sinItem) {
    if (sinItem.hasOwnProperty("id") && sinItem.id !== null) {
      this.setState(state => ({
        selectedSinIds: state.selectedSinIds.filter(s => s !== sinItem.id)
      }), this.persistData);
    } else {
      this.removeCustomSin(sinItem.text);
    }
  }

  addCustomSin(text) {
    this.setState(state => ({
      customSins: state.customSins.concat([text])
    }), this.persistData);
  }

  removeCustomSin(text) {
    this.setState(state => ({
      customSins: state.customSins.filter(s => s !== text)
    }), this.persistData);
  }

  clearAll() {
    this.setState(_ => ({
      selectedSinIds: [],
      customSins: []
    }), this.persistData);
  }

  render() {
    let sinsList = this.buildSinsList();

    let appClass = "App full-screen-app";
    if (window.location.pathname !== "/") {
      appClass = "App";
    }

    return (
      <BrowserRouter>
        <div className={appClass}>
          <Navbar sticky="top" variant="dark" bg="primary" expand="lg">
            <Navbar.Brand href="/"><h1>ConfessIt</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav text-white">
              <Nav className="mr-auto text-white">
                <Nav.Link href="/prayers">{this.translator.translate('app.navigation.prayers', this.state.locale)}</Nav.Link>
                <Nav.Link href="/help">{this.translator.translate('app.navigation.help', this.state.locale)}</Nav.Link>
                <Nav.Link href="/about">{this.translator.translate('app.navigation.about', this.state.locale)}</Nav.Link>
              </Nav>
              <select value={this.state.locale} onChange={(e) => {
                  e.persist();
                  this.setState(state => ({
                    ...state,
                  locale: e.target.value
                }), this.persistData);
              }}>
                <option value="en">{this.translator.translate('app.languages.english', this.state.locale)}</option>
                <option value="de">{this.translator.translate('app.languages.german', this.state.locale)}</option>
                <option value="el">{this.translator.translate('app.languages.greek', this.state.locale)}</option>
              </select>
              <Nav.Link onClick={this.clearAll}><i className="fa fa-ban"></i> Clear</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Container fluid={true}>
                <Row className="h-100">
                  <Col xs="12" className="h-100">
                    <Swiper {...this.swiperParams}>
                      <div className="col-scroll">
                        <ExamineList
                          translator={this.translator}
                          locale={this.state.locale}
                          sinsdb={this.sinsDb}
                          selectedSinIds={this.state.selectedSinIds}
                          onAddSinId={this.addSinId}
                          onRemoveSinItem={this.removeSinItem}
                          customSins={this.state.customSins}
                          onRemoveCustomSin={this.removeCustomSin}
                        />
                      </div>
                      <div className="col-scroll">
                        <SinsList
                          sinsList={sinsList}
                          onRemoveSinItem={this.removeSinItem}
                          translator={this.translator}
                          locale={this.state.locale}
                        />
                      </div>
                      <div className="col-scroll">
                        <Walkthrough
                            sinsList={sinsList}
                            translator={this.translator}
                            locale={this.state.locale}
                        />
                      </div>
                    </Swiper>
                  </Col>
                </Row>
                <AddButton addCustomSin={this.addCustomSin} />
              </Container>
            </Route>
            <Route path="/prayers">
              <Prayers />
            </Route>
            <Route path="/help">
              <Help />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
