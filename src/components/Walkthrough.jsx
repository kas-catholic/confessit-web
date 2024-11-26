import SpeechBubble from "@components/SpeechBubble";
import { Trans } from "react-i18next";
import { t } from "i18next";

const Walkthrough = ({ sinsList }) => {
  const sinCards = sinsList.map((sinItem, index) => (
    <SpeechBubble isPriest={false} key={index}>
      {sinItem.text}
    </SpeechBubble>
  ));

  return (
    <div>
      <SpeechBubble isPriest={true}>
        {t("walkthrough.in_the_name_of")}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {t("walkthrough.bless_me_father")}
      </SpeechBubble>

      {sinCards}

      <SpeechBubble isPriest={false}>
        {t("walkthrough.these_are_my_sins")}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t("walkthrough.your_confessor_may_offer")}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t("walkthrough.your_confessor_will_assign")}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        <Trans t={t} i18nKey="prayers.act_of_contrition_text">
          My God,
          <br />
          I am sorry for my sins with all my heart.
          <br />
          In choosing to do wrong and failing to do good, I have sinned against
          You, whom I should love above all things.
          <br />
          I firmly intend with Your help to do penance, to sin no more, and to
          avoid whatever leads me to sin.
          <br />
          Jesus Christ suffered and died for us. In His name, my God, have
          mercy.
        </Trans>
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t("walkthrough.god_the_father_of_mercies")}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>{t("walkthrough.amen")}</SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t("walkthrough.the_lord_has_freed_you")}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {t("walkthrough.thanks_be_to_god")}
      </SpeechBubble>
    </div>
  );
};

export default Walkthrough;
