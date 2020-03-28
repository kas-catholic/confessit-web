import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class About extends React.Component {
  render() {
    return <Container className="text-justify mt-4">
      <Row>
        <Col lg={{span: 8, offset: 2}} md={12}>
          <h1>About ConfessIt</h1>

          <h2><strong>Beta</strong></h2>

          <p><a href="https://confessit.app">ConfessIt.app</a> is currently in beta! While many features will work, you might notice some minor bugs.</p>

          <p>This website, <a href="https://confessit.app">ConfessIt.app</a>, is based on the <a href="https://play.google.com/store/apps/details?id=com.mikekasberg.confessit">ConfessIt Android App</a> (created in 2012 by the same developer). While it's not (yet) a complete reproduction, it aims to make the app available to a wider range of users on a broader range of devices. (This site works on iOS, Android, tablets, and computers!)</p>

          <h2>About Confession</h2>

          <p>
          Confession is the holy sacrament by which Catholics are forgiven their sins. Confession times are listed in your local parish bulletin, and you can find them online at your parish website or at <a href="https://masstimes.org/">masstimes.org</a>. You can also schedule a confession at any time you'd like by contacting your local parish.
          </p>

          <p>
          When you go to confession, typically, you will have the choice of kneeling anonymously behind a screen 
          or sitting face-to-face with your confessor. Don't be nervous about going to confession! 
          Whatever you confess, your priest has heard it before. 
          Remember, he is there to help you.
          </p>

          <h2>About This App</h2>

          <p>
          This app is designed to help Roman Catholics prepare for the sacrament of confession by examining their conscience.  
          It is <b>NOT</b> a substitute for confession.
          </p>

          <p>
          Please be respectful of those around you when you use this app. 
          I recommend that you turn your phone off when you're inside your church, and use this app before you arrive. 
          If you do use this app inside your church or during confession, please ensure your phone is in silent mode.
          </p>

          <h2>Privacy</h2>

          <p>
          Information you enter into this app is only stored on your device. It is not sent over the internet. We are able to do this using a technology provided by your web browser called <a href="https://en.wikipedia.org/wiki/Web_storage">local stroage</a>. We do not run Google Analytics or any other data collection mechanism on this site.
          </p>

          <hr />

          <p>
          Information in this app comes from the Revised Standard Version of the Holy Bible, Catholic Edition.  
          Information from the Catechism of the Catholic Church was also used.
          </p>
        </Col>
      </Row>
    </Container>;
  }
}

export default About;