import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Trans, withTranslation } from "react-i18next";

class AboutComponent extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <Container className="text-start mt-4">
        <Row>
          <Col lg={{ span: 8, offset: 2 }} md={12}>
            <h1>{t("about.about_confessit")}</h1>

            <p>
              <Trans
                t={t}
                i18nKey="about.about_confessit_text"
                components={{
                  vatican: (
                    <a href="https://www.vatican.va/content/vatican/en.html" />
                  ),
                }}
              >
                ConfessIt is a <vatican>Roman Catholic</vatican>
                examination of conscience for computers, tablets, and phones.
                It's designed to be simple and easy to use, and it can help you
                remember your sins when you go to confession. There's also a
                confession walkthrough that tells you exactly what the priest
                will say and how you should respond - a great resource if you
                haven't been to confession in a while! The examination of
                conscience is based on fundamental Catholic church teachings, is
                easy to understand, and is relevant for modern Catholics.
              </Trans>
            </p>

            <h2>{t("about.about_confession")}</h2>

            <p>{t("about.about_confession_intro")}</p>
            <blockquote>
              <Trans t={t} i18nKey="about.ccc_quote">
                <p>
                  It is called the sacrament of conversion because it makes
                  sacramentally present Jesus' call to conversion, the first
                  step in returning to the Father (Cf. Mk 1:15; Lk 15:18) from
                  whom one has strayed by sin.
                </p>
                <p>
                  It is called the sacrament of Penance, since it consecrates
                  the Christian sinner's personal and ecclesial steps of
                  conversion, penance, and satisfaction.
                </p>
                <p>
                  It is called the sacrament of confession, since the disclosure
                  or confession of sins to a priest is an essential element of
                  this sacrament. In a profound sense it is also a "confession"
                  - acknowledgment and praise - of the holiness of God and of
                  his mercy toward sinful man.
                </p>
                <p>
                  It is called the sacrament of forgiveness, since by the
                  priest's sacramental absolution God grants the penitent
                  "pardon and peace" (Ordo paenitantiae 46 formula of
                  absolution).
                </p>
                <p>
                  It is called the sacrament of Reconciliation, because it
                  imparts to the sinner the love of God who reconciles: "Be
                  reconciled to God" (2 Cor 5:20). He who lives by God's
                  merciful love is ready to respond to the Lord's call: "Go;
                  first be reconciled to your brother" (Mt 5:24).
                </p>

                <p>
                  Conversion to Christ, the new birth of Baptism, the gift of
                  the Holy Spirit and the Body and Blood of Christ received as
                  food have made us "holy and without blemish," just as the
                  Church herself, the Bride of Christ, is "holy and without
                  blemish" (Eph 1:4; 5:27). Nevertheless the new life received
                  in Christian initiation has not abolished the frailty and
                  weakness of human nature, nor the inclination to sin that
                  tradition calls concupiscence, which remains in the baptized
                  such that with the help of the grace of Christ they may prove
                  themselves in the struggle of Christian life (Cf. Council of
                  Trent, DS 1545; Lumen Gentium 40). This is the struggle of
                  conversion directed toward holiness and eternal life to which
                  the Lord never ceases to call us.
                </p>
                <p>
                  Jesus calls to conversion. This call is an essential part of
                  the proclamation of the kingdom: "The time is fulfilled, and
                  the kingdom of God is at hand; repent, and believe in the
                  gospel" (Mk 1:15). Baptism is the principal place for the
                  first and fundamental conversion, but then Christ's call to
                  conversion continues to resound in the lives of Christians.
                  This second conversion is an uninterrupted task for the whole
                  Church who, "clasping sinners to her bosom, (is) at once holy
                  and always in need of purification, (and) follows constantly
                  the path of penance and renewal" (Lumen Gentium 8). This
                  endeavor of conversion is not just a human work. It is the
                  movement of a "contrite heart," drawn and moved by grace to
                  respond to the merciful love of God who loved us first (Ps
                  51:17; Jn 6:44; 12:32; 1 Jn 4:10). St. Ambrose says of the two
                  conversions that, in the Church, "there are water and tears:
                  the water of Baptism and the tears of repentance" (epistle
                  41).
                </p>
                <footer>
                  — Catechism of the Catholic Church 1423-1424,1426; cf.
                  1427-1429
                </footer>
              </Trans>
            </blockquote>

            <p>
              <Trans
                t={t}
                i18nKey="about.where_to_find"
                components={{ mass: <a href="https://masstimes.org/" /> }}
              >
                Confession times are listed in your local parish bulletin, and
                you can find them online at your parish website or at
                <mass>masstimes.org</mass>. You can also schedule a confession
                at any time you'd like by contacting your local parish.
              </Trans>
            </p>

            <p>{t("about.about_confession_end")}</p>

            <h2>{t("about.about_this_app")}</h2>

            <p>
              <Trans t={t} i18nKey="about.this_app_is_designed">
                This app is designed to help Roman Catholics prepare for the
                sacrament of confession by examining their conscience. It is
                <strong>NOT</strong> a substitute for confession.
              </Trans>
            </p>

            <p>{t("about.please_be_respectful")}</p>

            <p>
              <Trans
                t={t}
                i18nKey="about.this_website"
                components={{
                  website: <a href="https://confessit.app" />,
                  app: (
                    <a href="https://play.google.com/store/apps/details?id=com.mikekasberg.confessit" />
                  ),
                }}
              >
                This website, <website>ConfessIt.app</website>, is based on the{" "}
                <app>ConfessIt Android App</app>
                (created in 2012 by the same developer). While it's not (yet) a
                complete reproduction, it aims to make the app available to a
                wider range of users on a broader range of devices. (This site
                works on iOS, Android, tablets, and computers!)
              </Trans>
            </p>

            <p>
              <Trans t={t} i18nKey="about.if_you_find">
                If you find this app useful, please consider
                <strong>sharing it</strong> with your friends and family. Tell
                people about it on Facebook, Reddit, Twitter, at your church, or
                in your Bible study group to help spread the word!
              </Trans>
            </p>

            <h2>{t("about.privacy")}</h2>
            <p>
              <Trans
                t={t}
                i18nKey="about.information_you_enter"
                components={{
                  website: (
                    <a href="https://en.wikipedia.org/wiki/Web_storage" />
                  ),
                }}
              >
                Information you enter into this app is only stored on your
                device. It is not sent over the internet. We are able to do this
                using a technology provided by your web browser called{" "}
                <website>local storage</website>. We do not run Google Analytics
                or any other data collection mechanism on this site. Data you
                enter will be saved on your device until you hit{" "}
                <code>Clear</code> even if you close the window or refresh the
                page.
              </Trans>
            </p>

            <h2>{t("about.open_source")}</h2>
            <p>
              <Trans
                t={t}
                i18nKey="about.confessit_is_open_source"
                components={{
                  githubicon: <i className="fa fa-github" />,
                  github: (
                    <a href="https://github.com/kas-catholic/confessit-web" />
                  ),
                  osc: <a href="https://www.opensourcecatholic.com/chat" />,
                }}
              >
                ConfessIt is open source. We develop the app on <githubicon />
                <github>GitHub</github>
                and we collaborate in the <osc>Open Source Catholic</osc>{" "}
                community on Slack.
              </Trans>
            </p>

            <h3>{t("about.can_i_help_with_translations")}</h3>
            <p>
              <Trans
                t={t}
                i18nKey="about.confessit_is_translated"
                components={{
                  github: (
                    <a href="https://github.com/kas-catholic/confessit-web/blob/main/CONTRIBUTING.md#contributing-translations" />
                  ),
                  osc: <a href="https://www.opensourcecatholic.com/chat" />,
                }}
              >
                ConfessIt is translated into multiple languages. If you'd like
                to help with this effort by adding a new translation or
                improving an existing translation, please read about how to do
                so on <github>GitHub</github>
                or get in touch with us on <osc>Open Source Catholic</osc>{" "}
                Slack.
              </Trans>
            </p>

            <h3>{t("about.can_i_help_write_code")}</h3>
            <p>
              <Trans
                t={t}
                i18nKey="about.we_welcome_new_contributions"
                components={{
                  github: (
                    <a href="https://github.com/kas-catholic/confessit-web/blob/main/CONTRIBUTING.md" />
                  ),
                }}
              >
                We welcome new contributions. If you'd like to contribute to
                ConfessIt, the best way to begin is by reading about how to do
                so on <github>GitHub</github>.
              </Trans>
            </p>

            <h3>{t("about.about_the_developer")}</h3>
            <p>
              <Trans
                t={t}
                i18nKey="about.mike_kasberg"
                components={{
                  website: <a href="https://www.mikekasberg.com" />,
                }}
              >
                <website>Mike Kasberg</website> develops ConfessIt in his free
                time, as a way of giving back to the church. He is also involved
                in a few other small projects to support Catholic organizations
                with technology.
              </Trans>
            </p>

            <hr />

            <p>{t("about.information")}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const About = withTranslation()(AboutComponent);
export default About;
