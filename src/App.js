import React from 'react';
import './App.css';
import ExamineList from './ExamineList';
import SinsList from './SinsList';
import Walkthrough from './Walkthrough';
import sinsdb from './data/sinsdb_en';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg="4">
            <ExamineList sinsdb={sinsdb} />
          </Col>
          <Col lg="4">
            <SinsList />
          </Col>
          <Col lg="4">
            <Walkthrough />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
