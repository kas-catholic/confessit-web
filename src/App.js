import React from 'react';
import './App.css';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';
import sinsdb from './data/sinsdb_en';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swiper from 'react-id-swiper';

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
      selectedSinIds: [1, 2, 3]
    };
    this.sinsById = new Map(sinsdb.sins.map(s =>
      [s.sin_id, s]
    ));

    // This binding is necessary to make `this` work in the callback
    this.addSinId = this.addSinId.bind(this);
    this.removeSinId = this.removeSinId.bind(this);
  }

  buildSinsList() {
    let sinIds = this.state.selectedSinIds;
    sinIds.sort();
    return sinIds.map(id =>
      this.sinsById.get(id).text_did
    );
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

  render() {
    let sinsList = this.buildSinsList();

    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="12">
              <Swiper {...this.swiperParams}>
                <div>
                  <ExamineList
                    sinsdb={sinsdb}
                    selectedSinIds={this.state.selectedSinIds}
                    onAddSinId={this.addSinId}
                    onRemoveSinId={this.removeSinId}
                  />
                </div>
                <div><SinsList sinsList={sinsList} /></div>
                <div><Walkthrough sinsList={sinsList} /></div>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
