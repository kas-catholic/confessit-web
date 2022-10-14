import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Trans, withTranslation } from 'react-i18next';

class HelpComponent extends React.Component {
  render() {
    const { t } = this.props;
    return <Container className="text-start mt-4">
      <Row>
        <Col lg={{span: 8, offset: 2}} md={12}>
          <h1>{t('help.confessit_help')}</h1>
          
          <h2>{t('help.basic_usage')}</h2>
          
          <ol>
            <li><Trans t={t} i18nKey="help.step_1">In the <strong>Examination</strong> tab, mark <strong>Yes</strong> next to all the sins you want to remember to confess.</Trans></li>
            <li><Trans t={t} i18nKey="help.step_2">Swipe to the next tab, <strong>Sins</strong>, to see a list of sins you've marked. You can review this list before or during confession if you wish.</Trans></li>
            <li><Trans t={t} i18nKey="help.step_3">If you're unsure what to say in confession, swipe to the next tab, <strong>Walkthrough</strong>, to see roughly what you and the priest will say to each other in confession. You can review this during confession if you wish.</Trans></li>
            <li><Trans t={t} i18nKey="help.step_4">After you've gone to confession, use the <strong>Clear</strong> button to clear all the sins you've marked.</Trans></li>
          </ol>

          <h2>{t('help.data_persistence')}</h2>

          <p>
            <Trans t={t} i18nKey="help.data_persistence_text">
              Data you enter is stored on your device (never sent over the Internet). Data you enter will be saved until you hit <strong>Clear</strong>, even if you close the window or refresh the page. Be sure to clear your data when you're done if you don't want other people who use this device to see your data!
            </Trans>
          </p>
          
        </Col>
      </Row>
    </Container>;
  }
}

const Help = withTranslation()(HelpComponent);
export default Help;