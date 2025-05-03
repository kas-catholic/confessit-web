import SpeechBubble from "@components/SpeechBubble";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

const Walkthrough = ({ sinsList }) => {
  const { t } = useTranslation();

  const [sins, setSins] = useState([""]);

  useEffect(() => {
    setSins(sinsList.map((e) => e.text));

    const observer = new MutationObserver(() => {
      const domOrder = Array.from(document.querySelectorAll("[data-id]")).map(
        (el) => el.dataset.id,
      );

      if (domOrder.length === sinsList.length) {
        setSins(domOrder);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [sinsList.length]);

  const sinCards = sins.map((sinItem, index) => (
    <SpeechBubble isPriest={false} key={index}>
      {sinItem}
    </SpeechBubble>
  ));

  return (
    <div>
      <SpeechBubble isPriest={true}>
        {t(
          "walkthrough.in_the_name_of",
          "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
        )}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {t(
          "walkthrough.bless_me_father",
          "Bless me father, for I have sinned. It has been ____ since my last confession, and these are my sins:",
        )}
      </SpeechBubble>

      {sinCards}

      <SpeechBubble isPriest={false}>
        {t(
          "walkthrough.these_are_my_sins",
          "These are my sins, and I am sorry for them with all my heart.",
        )}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t(
          "walkthrough.your_confessor_may_offer",
          "(Your confessor may offer you some advice or have a short conversation with you.)",
        )}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t(
          "walkthrough.your_confessor_will_assign",
          "(Your confessor will assign you penance.) Now pray the act of contrition.",
        )}
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
      <SpeechBubble isPriest={false}>
        {t("walkthrough.amen", "Amen.")}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {t(
          "walkthrough.the_lord_has_freed_you",
          "The Lord has freed you from sin. Go in peace.",
        )}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {t("walkthrough.thanks_be_to_god", "Thanks be to God.")}
      </SpeechBubble>
    </div>
  );
};

export default Walkthrough;
