import React from "react";
import ReactDOM from "react-dom";
import CloseIcon from "mdi-react/CloseIcon";
import HeaderLogo from "../../assets/logo_no_text_inverted.png";
import "./index.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="modal">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="h-screen flex flex-col justify-center"
      >
        <div className="modal-content flex justify-center space-x-2">
          <div className="bg-white rounded w-96 px-4">
            <div className="header py-2">
              <div className="flex justify-between items-center">
                <img src={HeaderLogo} className="w-7" alt="logo" />
                {props.title}
              </div>
            </div>
            <div className="content py-2">{props.content}</div>
            <div className=" actions py-2">{props.actions}</div>
          </div>
          <div className="self-start">
            <button
              className="text-white px-1.5 py-1 hover:bg-danger bg-primary rounded"
              onClick={props.onDismiss}
            >
              <CloseIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
