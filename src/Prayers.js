import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Trans, withTranslation } from 'react-i18next';

class PrayersComponent extends React.Component {
  render() {
    const { t } = this.props;

    return <Container className="text-justify mt-4">
      <Row>
        <Col lg={{span: 8, offset: 2}} md={12}>
          <h1>{t('prayers.prayers')}</h1>

          <ul>
            <li><a href="#prayer-before-confession">{t('prayers.prayer_before_confession')}</a></li>
            <li><a href="#act-of-contrition">{t('prayers.act_of_contrition')}</a></li>
            <li><a href="#another-act-of-contrition">{t('prayers.another_act_of_contrition')}</a></li>
            <li><a href="#thanksgiving-after-confession">{t('prayers.thanksgiving_after_confession')}</a></li>
            <li><a href="#our-father">{t('prayers.our_father')}</a></li>
            <li><a href="#hail-mary">{t('prayers.hail_mary')}</a></li>
            <li><a href="#hail-holy-queen">{t('prayers.hail_holy_queen')}</a></li>
          </ul>

          <h2 className="anchor-pad" id="prayer-before-confession">{t('prayers.prayer_before_confession')}</h2>
          <Trans t={t} i18nKey="prayers.prayer_before_confession_text">
            <p>
              My Lord and God, I have sinned. I am guilty before you.<br />
              Grant me the strength to say to Your minister what I say to You in the secret of my heart.<br />
              Increase my repentance. Make it more genuine. May it really be a sorrow for having offended You and my neighbor rather than a wounded love of self.<br />
              Help me to atone for my sin. May the sufferings of my life and my little mortifications be joined with the sufferings of Jesus, Your Son, and cooperate in rooting sin from the world.<br />
              Amen.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="act-of-contrition">{t('prayers.act_of_contrition')}</h2>
          <Trans t={t} i18nKey="prayers.act_of_contrition_text">
            <p>
              My God,<br />
              I am sorry for my sins with all my heart.<br />
              In choosing to do wrong and failing to do good, I have sinned against You, whom I should love above all things.<br />
              I firmly intend with Your help to do penance, to sin no more, and to avoid whatever leads me to sin.<br />
              Jesus Christ suffered and died for us. In His name, my God, have mercy.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="another-act-of-contrition">{t('prayers.another_act_of_contrition')}</h2>
          <Trans t={t} i18nKey="prayers.another_act_of_contrition_text">
            <p>
              O my God,<br />
              I am heartily sorry for having offended Thee, and I detest all of my sins, because I dread the loss of heaven, and the pains of hell;<br />
              but most of all because they offend Thee, my God, Who are all good and deserving of my love.<br />
              I firmly resolve, with the help of Thy grace, to confess my sins, to do penance, and to amend my life.<br />
              Amen.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="thanksgiving-after-confession">{t('prayers.thanksgiving_after_confession')}</h2>
          <Trans t={t} i18nKey="prayers.thanksgiving_after_confession_text">
            <p>
              My dearest Jesus,<br />
              I have told all my sins as well as I could. I have tried hard to make a good confession. I feel sure that You have forgiven me. I thank You. It is only because of all Your sufferings that I can go to confession and free myself from my sins. Your heart is full of love and mercy for poor sinners. I love You because You are so good to me.<br />
              My loving Savior,<br />
              I shall try to keep from sin and to love you more each day.<br />
              My dear Mother Mary,<br />
              pray for me and help me to keep my promises. Protect me and do not let me fall back into sin.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="our-father">{t('prayers.our_father')}</h2>
          <Trans t={t} i18nKey="prayers.our_father_text">
            <p>
              Our Father,<br />
              Who art in heaven, hallowed be Thy name;<br />
              Thy kingdom come, Thy will be done, on earth as it is in heaven.<br />
              Give us this day our daily bread, and forgive us our trespasses,<br />
              as we forgive those who trespass against us;<br />
              and lead us not into temptation, but deliver us from evil.<br />
              Amen.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="hail-mary">{t('prayers.hail_mary')}</h2>
          <Trans t={t} i18nKey="prayers.hail_mary_text">
            <p>
              Hail Mary, full of grace.<br />
              The Lord is with thee.<br />
              Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.<br />
              Holy Mary, mother of God,<br />
              pray for us sinners, now and at the hour of our death.<br />
              Amen.
            </p>
          </Trans>

          <h2 className="anchor-pad" id="hail-holy-queen">{t('prayers.hail_holy_queen')}</h2>
          <Trans t={t} i18nKey="prayers.hail_holy_queen_text">
            <p>
              Hail, holy Queen, Mother of Mercy!<br />
              Our life, our sweetness, and our hope!<br />
              To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, lonely and weeping in this valley of tears.<br />
              Turn then, most gracious advocate, thine eyes of mercy toward us; and after this our exile show unto us the blessed fruit of thy womb, Jesus.<br />
              O clement, O loving, O sweet virgin Mary. Pray for us, holy Mother of God, that we may be made worthy of the promises of Christ.<br />
              Amen.
            </p>
          </Trans>

        </Col>
      </Row>
    </Container>;
  }
}

const Prayers = withTranslation()(PrayersComponent);
export default Prayers;