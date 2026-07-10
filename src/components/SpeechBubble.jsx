import { m } from "../paraglide/messages.js";

const SpeechBubble = ({ isPriest, children }) => {
  const clazz = isPriest ? "chat-start" : "chat-end font-bold";
  const bubbleClass = isPriest ? " chat-bubble-neutral" : "";

  return (
    <div className={`chat mb-4 ${clazz}`}>
      {isPriest && (
        <div className="chat-header">{m["priestbubble.priest"]()}</div>
      )}
      <div className={`chat-bubble${bubbleClass} p-4`}>{children}</div>
    </div>
  );
};

export default SpeechBubble;
