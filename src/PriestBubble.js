import React from "react";
import Card from "react-bootstrap/Card";
import { withTranslation } from "react-i18next";

class PriestBubbleComponent extends React.Component {
  const { t } = this.props;
  render() {
    return <Card className="priest-bubble">{t("priestbubble.priest")}: {this.props.text}</Card>;
  }
}

const PriestBubble = withTranslation()(PriestBubbleComponent);
export default PriestBubble;
