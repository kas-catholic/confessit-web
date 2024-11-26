import { t } from "i18next";

import ExamineItem from "@components/ExamineItem";
import CommandmentGroup from "@components/CommandmentGroup";

const ExamineList = ({
  sinsdb,
  selectedSinIds,
  onAddSinId,
  onRemoveSinItem,
}) => {
  const sins = sinsdb.sins.reduce((result, sin) => {
    if (!result.hasOwnProperty(sin.commandment_id)) {
      result[sin.commandment_id] = [];
    }

    result[sin.commandment_id].push(
      <ExamineItem
        selected={selectedSinIds.includes(sin.sin_id)}
        sinId={sin.sin_id}
        text={t(`sins.${sin.sin_id}.text`)}
        key={sin.sin_id}
        onAddSinId={onAddSinId}
        onRemoveSinItem={onRemoveSinItem}
      />,
    );

    return result;
  }, {});

  const elements = sinsdb.commandments.map((c) => {
    const title = t(`commandments.${c.commandment_id}.title`);
    const text = t(`commandments.${c.commandment_id}.text`);

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

  return <div>{elements}</div>;
};

export default ExamineList;
