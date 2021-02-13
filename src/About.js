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

          <p>This website, <a href="https://confessit.app">ConfessIt.app</a>, is based on the <a href="https://play.google.com/store/apps/details?id=com.mikekasberg.confessit">ConfessIt Android App</a> (created in 2012 by the same developer). While it's not (yet) a complete reproduction, it aims to make the app available to a wider range of users on a broader range of devices. (This site works on iOS, Android, tablets, and computers!)</p>

          <h2>About Confession</h2>

          <p>
          Confession is the holy sacrament by which Catholics obtain pardon from God's mercy for their sins, and are thus reconciled with the Church, the community of believers, the Body of Christ.
          </p>
          <blockquote>
            <p>
            It is called the sacrament of conversion because it makes sacramentally present Jesus' call to conversion, the first step in returning to the Father (Cf. Mk 1:15; Lk 15:18) from whom one has strayed by sin. 
            It is called the sacrament of Penance, since it consecrates the Christian sinner's personal and ecclesial steps of conversion, penance, and satisfaction. 
            It is called the sacrament of confession, since the disclosure or confession of sins to a priest is an essential element of this sacrament. In a profound sense it is also a "confession" - acknowledgment and praise - of the holiness of God and of his mercy toward sinful man. 
            It is called the sacrament of forgiveness, since by the priest's sacramental absolution God grants the penitent "pardon and peace" (Ordo paenitantiae 46 formula of absolution). 
            It is called the sacrament of Reconciliation, because it imparts to the sinner the love of God who reconciles: "Be reconciled to God" (2 Cor 5:20). He who lives by God's merciful love is ready to respond to the Lord's call: "Go; first be reconciled to your brother" (Mt 5:24). 
            </p>
            <p>
            Conversion to Christ, the new birth of Baptism, the gift of the Holy Spirit and the Body and Blood of Christ received as food have made us "holy and without blemish," 
            just as the Church herself, the Bride of Christ, is "holy and without blemish" (Eph 1:4; 5:27). 
            Nevertheless the new life received in Christian initiation has not abolished the frailty and weakness of human nature, nor the inclination to sin that tradition calls concupiscence, 
            which remains in the baptized such that with the help of the grace of Christ they may prove themselves in the struggle of Christian life (Cf. Council of Trent, DS 1545; Lumen Gentium 40). 
            This is the struggle of conversion directed toward holiness and eternal life to which the Lord never ceases to call us. 
            </p>
            <p>
            Jesus calls to conversion. This call is an essential part of the proclamation of the kingdom: "The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel" (Mk 1:15). 
            Baptism is the principal place for the first and fundamental conversion, but then Christ's call to conversion continues to resound in the lives of Christians. 
            This second conversion is an uninterrupted task for the whole Church who, "clasping sinners to her bosom, (is) at once holy and always in need of purification, (and) follows constantly the path of penance and renewal" (Lumen Gentium 8). 
            This endeavor of conversion is not just a human work. 
            It is the movement of a "contrite heart," drawn and moved by grace to respond to the merciful love of God who loved us first (Ps 51:17; Jn 6:44; 12:32; 1 Jn 4:10). 
            St. Ambrose says of the two conversions that, in the Church, "there are water and tears: the water of Baptism and the tears of repentance" (epistle 41).
            </p>
            <footer>Catechism of the Catholic Church 1423-1424,1426; cf. 1427-1429</footer>
          </blockquote>
          <p>
          Confession times are listed in your local parish bulletin, and you can find them online at your parish website or at <a href="https://masstimes.org/">masstimes.org</a>. You can also schedule a confession at any time you'd like by contacting your local parish.
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
          <p><a href="https://confessit.app">ConfessIt.app</a> is a <a href="https://create-react-app.dev/docs/making-a-progressive-web-app/">progressive web app</a> written in <a href="https://reactjs.org">React</a> with <a href="https://react-bootstrap.github.io/">React Bootstrap</a>. We develop the app on <a href="https://github.com/kas-catholic/confessit-web">GitHub</a> and welcome new contributors. We also collaborate on the <a href="https://www.opensourcecatholic.com/chat">Open Source Catholic</a> Slack channel.</p>

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
