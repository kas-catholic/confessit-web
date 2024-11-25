import { t } from "i18next";

const SpeechBubble = ({ isPriest, children }) => {
  const clazz = isPriest ? "chat-start" : "chat-end";

  return (
    <div className={`chat mb-4 ${clazz}`}>
      {isPriest && <div className="chat-header">{t('priestbubble.priest')}</div>}
      <div className="chat-bubble chat-bubble-secondary">
        {children}
      </div>
    </div>
  );
};

export default SpeechBubble;