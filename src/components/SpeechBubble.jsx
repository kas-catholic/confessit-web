import { t } from "i18next";

const SpeechBubble = ({ isPriest, children }) => {
  const clazz = isPriest ? "chat-start" : "chat-end";
  const bubbleClass = isPriest ? "chat-bubble-secondary" : "chat-bubble-accent";

  return (
    <div className={`chat mb-4 ${clazz}`}>
      {isPriest && (
        <div className="chat-header">{t("priestbubble.priest")}</div>
      )}
      <div className={`chat-bubble ${bubbleClass}`}>{children}</div>
    </div>
  );
};

export default SpeechBubble;
