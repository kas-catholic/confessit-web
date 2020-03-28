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

          <h3>About the Developer</h3>
          <p><a href="https://www.mikekasberg.com">Mike Kasberg</a> develops ConfessIt in his free time, as a way of giving back to the church. He is also involved in a couple other small projects to support Catholic organizations with technology.</p>

          <h3>How Can I Help?</h3>

          <p>The easiest way you can help is by sharing this app with your friends and family. Consider telling people about it on Facebook, Reddit, or Twitter, at your church, or in your Bible study group.</p>

          <h4>Can I help write code?</h4>
          <p><a href="https://confessit.app">ConfessIt.app</a> is a <a href="https://create-react-app.dev/docs/making-a-progressive-web-app/">progressive web app</a> written in <a href="https://reactjs.org">React</a> with <a href="https://react-bootstrap.github.io/">React Bootstrap</a>. If you're comfortable with these technologies and you'd like to contribute, please <a href="mailto:mike+confessitweb@mikekasberg.com">get in touch</a> and let me know what you're interested in helping with. I could use the most help improving the design of the site or cleaning up and organizing the codebase.</p>

          <h2>Privacy</h2>

          <p>
          Information you enter into this app is only stored on your device. It is not sent over the internet. We are able to do this using a technology provided by your web browser called <a href="https://en.wikipedia.org/wiki/Web_storage">local stroage</a>. We do not run Google Analytics or any other data collection mechanism on this site. Data you enter will be saved on your device until you hit <code>Clear</code> even if you close the window or refresh the page.
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