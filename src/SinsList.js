import React from "react";
import "./SinsList.scss";
import SinListItem from "./SinListItem";
import { withTranslation } from "react-i18next";

class SinsListComponent extends React.Component {
  render() {
    const { t } = this.props;

    let sinCards = this.props.sinsList.map((sinItem, index) => (
      <SinListItem
        key={index}
        sinItem={sinItem}
        onRemoveSinItem={this.props.onRemoveSinItem}
      />
    ));

    return (
      <div>
        <h2 className="mt-5">{t("sins_list.review")}</h2>
        {sinCards}
      </div>
    );
  }
}

const SinsList = withTranslation()(SinsListComponent);
export default SinsList;
