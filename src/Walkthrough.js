import React from "react";
import "./Walkthrough.scss";
import PriestBubble from "./PriestBubble";
import UserBubble from "./UserBubble";
import { withTranslation } from "react-i18next";

class WalkthroughComponent extends React.Component {
  render() {
    const { t } = this.props;
    let sinCards = this.props.sinsList.map((sinItem, index) => (
      <UserBubble key={index}>{sinItem.text}</UserBubble>
    ));

    return (
      <div>
        <h2 className="mt-5">{t("walkthrough.walkthrough")}</h2>
        <PriestBubble text={t("walkthrough.in_the_name_of")} />
        <UserBubble>{t("walkthrough.bless_me_father")}</UserBubble>

        {sinCards}

        <UserBubble>{t("walkthrough.these_are_my_sins")}</UserBubble>
        <PriestBubble text={t("walkthrough.your_confessor_may_offer")} />
        <PriestBubble text={t("walkthrough.your_confessor_will_assign")} />
        <UserBubble>
          <div
            dangerouslySetInnerHTML={{
              __html: t("prayers.act_of_contrition_text", {
                interpolation: { escapeValue: false },
              }),
            }}
          />
        </UserBubble>
        <PriestBubble text={t("walkthrough.god_the_father_of_mercies")} />
        <UserBubble>{t("walkthrough.amen")}</UserBubble>
        <PriestBubble text={t("walkthrough.the_lord_has_freed_you")} />
        <UserBubble>{t("walkthrough.thanks_be_to_god")}</UserBubble>
      </div>
    );
  }
}

const Walkthrough = withTranslation()(WalkthroughComponent);
export default Walkthrough;
