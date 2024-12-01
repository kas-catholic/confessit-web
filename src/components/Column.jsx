const Column = ({ title, children }) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="lg:mx-4">
        <h2 className="text-4xl font-bold text-center my-12 mx-auto">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Column;
