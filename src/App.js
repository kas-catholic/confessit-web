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

function App() {

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs="12">
            <Swiper>
              <div><ExamineList sinsdb={sinsdb} /></div>
              <div><SinsList /></div>
              <div><Walkthrough /></div>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
