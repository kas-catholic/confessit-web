import { t } from "i18next";

const SpeechBubble = ({ isPriest, children }) => {
  const clazz = isPriest ? "chat-start" : "chat-end font-bold";
  const bubbleClass = isPriest ? "" : "chat-bubble-primary";

  return (
    <div className={`chat mb-4 ${clazz}`}>
      {isPriest && (
        <div className="chat-header">{t("priestbubble.priest")}</div>
      )}
      <div className={`chat-bubble p-4 ${bubbleClass}`}>{children}</div>
    </div>
  );
};

export default SpeechBubble;
