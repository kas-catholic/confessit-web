import React from "react";
import Card from "react-bootstrap/Card";
import { withTranslation } from "react-i18next";

class PriestBubble extends React.Component {
  render() {
    const { t } = this.props;
    return <Card className="priest-bubble">{t("priestbubble.priest")}: {this.props.text}</Card>;
  }
}

export { PriestBubble };
export default withTranslation()(PriestBubble);
