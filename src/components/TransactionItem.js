import React from "react";
import "./ExpenseIncomeStyle.css";
import formatDate from "../service/dateService";

function TransactionItem({ data }) {
  return (
    <>
      <div>
        <div className="transaction-item-name">
          <h3 className="m-0 p-0">{data.name}</h3>
          <span className="tag-text">{data.categoryName}</span>
        </div>
        <div className="transaction-item-price">
          <span className="faded-white">{formatDate(data.dateAdded)}</span>
          <span className="f-size20">
            {data.amount} {data.currency}
          </span>
        </div>
        <div className="transaction-item-date faded-white f-size15 m-t-5">
          <i>Last modified: {formatDate(data.dateLastUpdated)}</i>
        </div>
        <p></p>
      </div>
    </>
  );
}

export default TransactionItem;
