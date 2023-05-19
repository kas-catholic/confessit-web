import React from "react";
import "./AddButton.scss";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormControl } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class AddButton extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);

    this.state = {
      showModal: false,
      inputValue: "",
    };
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleAdd() {
    this.props.addCustomSin(this.state.inputValue);
    this.setState({ inputValue: "" });
    this.handleClose();
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <div className="fab" onClick={this.handleShow}>
          +
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t("addbutton.add-custom-sin")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              as="textarea"
              rows={3}
              id="add-sin-input"
              onInput={(e) => this.setState({ inputValue: e.target.value })}
              placeholder={t("addbutton.i-sinned-by")}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              {t("addbutton.cancel")}
            </Button>
            <Button className="add-button" onClick={this.handleAdd}>
              {t("addbutton.add")}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export AddButton;
export default withTranslation()(AddButton);
