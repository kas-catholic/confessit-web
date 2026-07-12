import { useState } from "react";
import { m } from "../paraglide/messages.js";

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
        <h3 className="text-lg font-bold">{m["addbutton.add-custom-sin"]()}</h3>
        <textarea
          className="my-4 textarea textarea-bordered w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={m["addbutton.i-sinned-by"]()}
        ></textarea>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleCancel}>
              {m["addbutton.cancel"]()}
            </button>
          </form>
          <form method="dialog">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {m["addbutton.add"]()}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddSinModal;
