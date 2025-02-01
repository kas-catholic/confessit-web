import SinListItem from "@components/SinListItem";

const SinsList = ({ sinsList, onRemoveSinItem }) => {
  const sinItems = sinsList.map((sinItem, index) => (
    <SinListItem
      sinItem={sinItem}
      onRemoveSinItem={onRemoveSinItem}
      key={index}
    />
  ));

  return <div className="flex flex-col px-4 gap-4">{sinItems}</div>;
};

export default SinsList;
