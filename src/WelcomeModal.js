import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Trans, useTranslation } from "react-i18next";

function WelcomeModal() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("confessit.welcome", true);
  };

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("confessit.welcome");
    if (!hasSeenWelcome) {
      setShow(true);
    }
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{t("welcome.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="text-primary">ConfessIt</span>{" "}
          <Trans t={t} i18nKey="welcome.body">
            is a tool to help Roman Catholics walk through an examination of
            conscience prior to going to confession. We hope you'll find this
            useful to help remember sins you've committed since your last
            confession. Just check the <strong>Yes</strong> box next to sins in
            the <strong>Examine</strong> list, or tap the plus button to add
            your own. Then, scroll to the right to <strong>Review</strong> your
            sins and <strong>Walkthrough</strong> the steps of going to
            confession.
            <br />
            <br />
            Data you enter is stored on your device (<strong>never</strong> sent
            over the Internet). Data you enter will be saved until you hit{" "}
            <strong>Clear</strong>, even if you close the window or refresh the
            page.
            <br />
            <br />
            God bless you on your path to holiness!
          </Trans>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WelcomeModal;
