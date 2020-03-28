import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class About extends React.Component {
  render() {
    return <Container className="text-justify mt-4">
    <Row>
    <Col lg={{span: 8, offset: 2}} md={12}>
    <h1>ConfessIt Help</h1>
    
    <h2>Basic Usage</h2>
    
    <ol>
      <li>In the <code>Examination</code> tab, mark <code>Yes</code> next to all the sins you want to remember to confess.</li>
      <li>Swipe to the next tab, <code>Sins</code>, to see a list of sins you've marked. You can review this list before or during confession if you wish.</li>
      <li>If you're unsure what to say in confession, swipe to the next tab, <code>Walkthrough</code>, to see roughly what you and the priest will say to each other in confession. You can review this during confession if you wish.</li>
      <li>After you've gone to confession, use the <code>Clear</code> button to clear all the sins you've marked.</li>
    </ol>
    
    </Col>
    </Row>
    </Container>;
  }
}

export default About;