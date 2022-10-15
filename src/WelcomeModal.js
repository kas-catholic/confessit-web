import React, { useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
function WelcomeModal() {
    const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('confessit.welcome', true)
  }

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('confessit.welcome')
    if (!hasSeenWelcome){
        setShow(true);
    }
  },[])

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body><span className="text-primary">ConfessIt</span> is a tool to help Roman Catholics walk through an examination of conscience prior to going to confession. 
        We hope you'll find this useful to help remember sins you've committed since your last confession. 
        Just check the <strong>Yes</strong> box next to sins in the Examine list, or tap the plus button to add your own. 
        Then, scroll to the right to <strong>Review</strong> your sins and <strong>Walkthrough</strong> the steps of going to confession. 
            <br /><br />Data you enter is stored on your device (<strong>never</strong> sent over the Internet). Data you enter will be saved until you hit <strong>Clear</strong>, even if you close the window or refresh the page. 
            <br /><br />God bless you on your path to holiness!
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WelcomeModal;
