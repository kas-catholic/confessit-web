import React from 'react';
import './App.scss';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';
import sinsdb from './data/sinsdb_en';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swiper from 'react-id-swiper';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import About from './About';
import AddButton from './AddButton';

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
    this.state = {
      selectedSinIds: [],
      customSins: []
    };
    this.sinsById = new Map(sinsdb.sins.map(s =>
      [s.sin_id, s]
    ));

    // This binding is necessary to make `this` work in the callback
    this.addSinId = this.addSinId.bind(this);
    this.removeSinId = this.removeSinId.bind(this);
    this.addCustomSin = this.addCustomSin.bind(this);
    this.removeCustomSin = this.removeCustomSin.bind(this);
  }

  buildSinsList() {
    let sinIds = this.state.selectedSinIds;

    return sinIds.map(id =>
      this.sinsById.get(id).text_did
    ).concat(this.state.customSins);
  }

  addSinId(id) {
    this.setState(state => ({
      selectedSinIds: state.selectedSinIds.concat([id])
    }));
  }

  removeSinId(id) {
    this.setState(state => ({
      selectedSinIds: state.selectedSinIds.filter(s => s !== id)
    }));
  }

  addCustomSin(text) {
    this.setState(state => ({
      customSins: state.customSins.concat([text])
    }));
  }

  removeCustomSin(text) {
    this.setState(state => ({
      customSins: state.customSins.filter(s => s !== text)
    }));
  }

  render() {
    let sinsList = this.buildSinsList();

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar sticky="top" variant="dark" bg="primary" expand="lg">
            <Navbar.Brand href="/"><h1>ConfessIt</h1></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto text-white">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>
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
                          sinsdb={sinsdb}
                          selectedSinIds={this.state.selectedSinIds}
                          onAddSinId={this.addSinId}
                          onRemoveSinId={this.removeSinId}
                          customSins={this.state.customSins}
                          onRemoveCustomSin={this.removeCustomSin}
                        />
                      </div>
                      <div className="col-scroll">
                        <SinsList sinsList={sinsList} />
                      </div>
                      <div className="col-scroll">
                        <Walkthrough sinsList={sinsList} />
                      </div>
                    </Swiper>
                  </Col>
                </Row>
                <AddButton addCustomSin={this.addCustomSin} />
              </Container>
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
