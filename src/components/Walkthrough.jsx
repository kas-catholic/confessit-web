import SpeechBubble from "@components/SpeechBubble";
import { m } from "../paraglide/messages.js";
import { getLocale } from "../paraglide/runtime.js";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const Walkthrough = ({ sinsList, lastConfessionDate }) => {
  const sinCards = sinsList.map((sinItem, index) => (
    <SpeechBubble isPriest={false} key={index}>
      {sinItem.text}
    </SpeechBubble>
  ));

  const getTimeSinceLastConfession = () => {
    if (!lastConfessionDate) {
      return "____";
    }
    const locale = getLocale();
    const now = new Date().getTime();
    const lastConfessionTimestamp = new Date(lastConfessionDate).getTime();

    const diffDays = Math.floor(
      (now - lastConfessionTimestamp) / MILLISECONDS_PER_DAY,
    );

    if (diffDays <= 0) {
      return "____";
    }

    const duration = {};
    if (diffDays >= 365) {
      duration.years = Math.floor(diffDays / 365);
    } else if (diffDays >= 30) {
      duration.months = Math.floor(diffDays / 30);
    } else if (diffDays >= 7) {
      duration.weeks = Math.floor(diffDays / 7);
    } else {
      duration.days = diffDays;
    }

    return new Intl.DurationFormat(locale, { style: "long" }).format(duration);
  };

  return (
    <div>
      <SpeechBubble isPriest={true}>
        {m["walkthrough.in_the_name_of"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {m["walkthrough.bless_me_father"]({
          timeSinceLastConfession: getTimeSinceLastConfession(),
        })}
      </SpeechBubble>

      {sinCards}

      <SpeechBubble isPriest={false}>
        {m["walkthrough.these_are_my_sins"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {m["walkthrough.your_confessor_may_offer"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {m["walkthrough.your_confessor_will_assign"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        <span
          dangerouslySetInnerHTML={{
            __html: m["prayers.act_of_contrition_text"](),
          }}
        />
      </SpeechBubble>
      <SpeechBubble isPriest={true}>
        {m["walkthrough.god_the_father_of_mercies"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>{m["walkthrough.amen"]()}</SpeechBubble>
      <SpeechBubble isPriest={true}>
        {m["walkthrough.the_lord_has_freed_you"]()}
      </SpeechBubble>
      <SpeechBubble isPriest={false}>
        {m["walkthrough.thanks_be_to_god"]()}
      </SpeechBubble>
    </div>
  );
};

export default Walkthrough;
