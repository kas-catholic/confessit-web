import React from "react";
import CommandmentGroup from "./CommandmentGroup";
import ExamineItem from "./ExamineItem";
import { withTranslation } from "react-i18next";

class ExamineListComponent extends React.Component {
  render() {
    const { t, sinsdb } = this.props;

    let sins = sinsdb.sins.reduce((obj, sin) => {
      if (!obj.hasOwnProperty(sin.commandment_id)) {
        obj[sin.commandment_id] = [];
      }

      obj[sin.commandment_id].push(
        <ExamineItem
          selected={this.props.selectedSinIds.includes(sin.sin_id)}
          sinId={sin.sin_id}
          text={t(`sins.${sin.sin_id}.text`)}
          key={sin.sin_id}
          onAddSinId={this.props.onAddSinId}
          onRemoveSinItem={this.props.onRemoveSinItem}
        />
      );

      return obj;
    }, {});

    let elements = sinsdb.commandments.map((c) => {
      let title = t(`commandments.${c.commandment_id}.title`);
      let text = t(`commandments.${c.commandment_id}.text`);

      return (
        <CommandmentGroup
          title={title}
          text={text}
          cmdId={c.commandment_id}
          key={c.commandment_id}
        >
          <div>{sins[c.commandment_id]}</div>
        </CommandmentGroup>
      );
    });

    return (
      <div>
        <h2 className="mt-5">{t("examine_list.examine")}</h2>
        {elements}
      </div>
    );
  }
}

const ExamineList = withTranslation()(ExamineListComponent);
export default ExamineList;
