const CommandmentGroup = ({ title, text, children }) => {
  // TODO: Use a daisyUI Collapse component to make this group collapsible.
  // Store any necessary collapse state in this component.
  return (
    <div className="collapse collapse-arrow mb-8 bg-base-200 rounded-none lg:rounded-md">
      <input type="checkbox" defaultChecked />

      <div className="collapse-title bg-base-300">
        <h3 className="text-2xl">{title}</h3>
        <p>{text}</p>
      </div>

      <div className="collapse-content">
        <div className="flex flex-col pt-2">{children}</div>
      </div>
    </div>
  );
};

export default CommandmentGroup;
