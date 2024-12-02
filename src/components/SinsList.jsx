import { t } from "i18next";

import SinListItem from "@components/SinListItem";

const SinsList = ({ sinsList, onRemoveSinItem }) => {
  const sinItems = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={index}
    />
  ));

  return (
    <div className="bg-base-200 flex flex-col py-4 px-4 rounded-none lg:rounded-md min-h-screen lg:min-h-0">
      {sinItems}
    </div>
  );
};

export default SinsList;
