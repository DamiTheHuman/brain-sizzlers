import React from "react";
import ReactDOM from "react-dom";

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
            <div className="header border-b-2  border-gray-600 py-2">
              {props.title}
            </div>
            <div className="content py-2 border-b">{props.content}</div>
            <div className=" actions py-2">{props.actions}</div>
          </div>
          <div className="close">
            <button
              className="text-white px-1.5 py-1 hover:bg-gray-800 rounded"
              onClick={props.onDismiss}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
