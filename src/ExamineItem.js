import React from "react";
import "./ExamineItem.scss";
import Card from "react-bootstrap/Card";
import { withTranslation } from "react-i18next";

class ExamineItem extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.checked) {
      this.props.onAddSinId(this.props.sinId);
    } else {
      this.props.onRemoveSinItem({ id: this.props.sinId });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Card className="examine-item">
        {this.props.text}
        <div className="md-checkbox">
          <input
            id={"checkitem:" + this.props.sinId}
            type="checkbox"
            checked={this.props.selected}
            onChange={this.handleClick}
          />
          <label htmlFor={"checkitem:" + this.props.sinId}>{t("examineitem.yes")}</label>
        </div>
      </Card>
    );
  }
}

export { ExamineItem };
export default withTranslation()(ExamineItem);
