import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";

const WelcomeModal = () => {
  const { t } = useTranslation();

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
        <h3 className="text-lg font-bold">{t("welcome.title", "Welcome!")}</h3>
        <p>
          <span className="text-primary font-bold">ConfessIt</span>{" "}
          <Trans t={t} i18nKey="welcome.body">
            is a tool to help Roman Catholics walk through an examination of
            conscience prior to going to confession. We hope you&apos;ll find
            this useful to help remember sins you&apos;ve committed since your
            last confession. Just check the <strong>Yes</strong> box next to
            sins in the <strong>Examine</strong> list, or tap the{" "}
            <kbd className="kbd kbd-sm">+</kbd> button to add your own. Then,
            scroll to the right to <strong>Review</strong>
            your sins and <strong>Walkthrough</strong> the steps of going to
            confession.
            <br />
            <br />
            Data you enter is stored on your device (<strong>never</strong> sent
            over the Internet). Data you enter will be saved until you hit
            <strong>Clear</strong>, even if you close the window or refresh the
            page.
            <br />
            <br />
            God bless you on your path to holiness!
          </Trans>
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleClose}>
              {t("welcome.ok", "OK")}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default WelcomeModal;
