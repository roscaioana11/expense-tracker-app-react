import React from "react";
import "./TotalAmountComponentStyle.css";

function TotalAmountComponent({ icon, amount, description }) {
  return (
    <>
      <div className="total-amount-container round-container m-10">
        <div style={{ width: "25%" }} className="flex-center-content">
          {icon}
        </div>
        <div style={{ width: "75%" }}>
          <h2 className="m-0">{amount}</h2>
          <i>{description}</i>
        </div>
      </div>
    </>
  );
}

export default TotalAmountComponent;
