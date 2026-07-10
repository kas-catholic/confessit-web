import { useEffect } from "react";
import { m } from "../paraglide/messages.js";

const WelcomeModal = () => {
  const handleClose = () => {
    localStorage.setItem("confessit.welcome", true);
  };

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("confessit.welcome");
    if (!hasSeenWelcome) {
      // eslint-disable-next-line no-undef
      WelcomeModalId.showModal();
    }
  }, []);

  return (
    <dialog id="WelcomeModalId" className="modal modal-bottom lg:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{m["welcome.title"]()}</h3>
        <p>
          <span className="text-primary font-bold">ConfessIt</span>{" "}
          <span dangerouslySetInnerHTML={{ __html: m["welcome.body"]() }} />
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleClose}>
              {m["welcome.ok"]()}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default WelcomeModal;
