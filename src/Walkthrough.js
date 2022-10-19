import React from "react";
import "./Walkthrough.scss";
import PriestBubble from "./PriestBubble";
import UserBubble from "./UserBubble";
import { Trans, withTranslation } from "react-i18next";

class WalkthroughComponent extends React.Component {
  render() {
    const { t } = this.props;
    let sinCards = this.props.sinsList.map((sinItem, index) => (
      <UserBubble key={index}>{sinItem.text}</UserBubble>
    ));

    return (
      <div>
        <h2>{t("walkthrough.walkthrough")}</h2>
        <PriestBubble text={t("walkthrough.in_the_name_of")} />
        <UserBubble>{t("walkthrough.bless_me_father")}</UserBubble>

        {sinCards}

        <UserBubble>{t("walkthrough.these_are_my_sins")}</UserBubble>
        <PriestBubble text={t("walkthrough.your_confessor_may_offer")} />
        <PriestBubble text={t("walkthrough.your_confessor_will_assign")} />
        <UserBubble>
          <Trans t={t} i18nKey="walkthrough.act_of_contrition">
            <p>My God, I am sorry for my sins with all my heart.</p>
            <p>
              In choosing to do wrong and failing to do good, I have sinned
              against You, whom I should love above all things.
            </p>
            <p>
              I firmly intend with Your help to do penance, to sin no more, and
              to avoid whatever leads me to sin.
            </p>
            <p>
              Jesus Christ suffered and died for us. In His name, my God, have
              mercy.
            </p>
          </Trans>
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
