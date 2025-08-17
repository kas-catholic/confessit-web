import SpeechBubble from "@components/SpeechBubble";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const Walkthrough = ({ sinsList, lastConfessionDate }) => {
  const { t } = useTranslation();
  const [timeUnit, setTimeUnit] = useState("unkown");
  const [timeSinceLastConfession, setTimeSinceLastConfession] = useState(0);

  const sinCards = sinsList.map((sinItem, index) => (
    <SpeechBubble isPriest={false} key={index}>
      {sinItem.text}
    </SpeechBubble>
  ));

  useEffect(() => {
    const { count, timeUnit } = calculateTimeSinceLastConfession();
    setTimeSinceLastConfession(count);
    setTimeUnit(timeUnit);
  }, [lastConfessionDate, i18next.language]);

  const calculateTimeSinceLastConfession = () => {
    const defaultResponse = { count: 0, timeUnit: "unkown" };
    if (!lastConfessionDate) {
      return defaultResponse;
    }

    const now = new Date().getTime();
    const lastConfessionTimestamp = new Date(lastConfessionDate).getTime();
    const diffDays = Math.floor(
      (now - lastConfessionTimestamp) / MILLISECONDS_PER_DAY,
    );

    if (diffDays <= 0 || isNaN(diffDays)) {
      return defaultResponse;
    }

    const units = [
      { min: 365, key: "year" },
      { min: 30, key: "month" },
      { min: 7, key: "week" },
      { min: 1, key: "day" },
    ];

    for (const unit of units) {
      if (diffDays >= unit.min) {
        return {
          count: Math.floor(diffDays / unit.min),
          timeUnit: unit.key,
        };
      }
    }
  };

  return (
    <div>
      <SpeechBubble isPriest={true}>
        {t(
          "walkthrough.in_the_name_of",
          "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
        )}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {t(`walkthrough.bless_me_father_${timeUnit}`, {
          defaultValue:
            "Bless me father, for I have sinned. It has been {{count}} since my last confession, and these are my sins:",
          count: timeSinceLastConfession,
        })}
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
