import React from "react";

const Card = ({ header, body }) => {
  const renderHeader = () => {
    if (!header) {
      return null;
    }
    return (
      <div className="card-header p-2 px-4 font-semibold border-b">
        {header}
      </div>
    );
  };
  return (
    <div className="card rounded border shadow w-full">
      {renderHeader()}
      <div className="card-body px-4">{body}</div>
    </div>
  );
};
export default Card;
