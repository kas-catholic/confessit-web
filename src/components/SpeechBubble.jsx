const SpeechBubble = ({ isPriest, children }) => {
  const clazz = isPriest ? "bg-gray-100" : "bg-blue-200";
  
  return (<div className={clazz}>{children}</div>);
};

export default SpeechBubble;