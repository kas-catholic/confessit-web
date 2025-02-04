import { useState } from "react";
import { t } from "i18next";

const AddSinModal = ({ addCustomSin }) => {
  const [inputValue, setInputValue] = useState("");

  const handleCancel = () => {
    setInputValue("");
  };

  const handleSubmit = () => {
    addCustomSin(inputValue);
    setInputValue("");
  };

  return (
    <dialog id="AddSinModal" className="modal modal-bottom lg:modal-middle">
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          {t("addbutton.add-custom-sin", "Add custom sin")}
        </h3>
        <textarea
          className="my-4 textarea textarea-bordered w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t("addbutton.i-sinned-by", "I sinned by…")}
        ></textarea>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleCancel}>
              {t("addbutton.cancel", "Cancel")}
            </button>
          </form>
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {t("addbutton.add", "Add")}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddSinModal;
