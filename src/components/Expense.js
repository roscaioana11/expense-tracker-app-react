import React, { useState } from "react";
import "./ExpenseIncomeStyle.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusSquare } from "react-icons/ai";
import TransactionItem from "./TransactionItem";
import ExpenseModal from "./modals/ExpenseModal";
import expenseService from "../service/expenseService";

function Expense({ onExpenseListModified }) {
  // need to use setExpenses when you want to change the value otherwise if you use directly the value, you won't see the change
  // you must useState if you want to display a value on the template
  // to be able to see the change visually on browser
  // when use setExpenses (or any other setters) the function will be called again => re-rendering
  let [expenses, setExpenses] = useState(expenseService.getAll());
  const [editedExpense, setEditedExpense] = useState(expenseService.getEmptyExpense());
  const [isModalActive, setIsModalActive] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function openModalOnAdd() {
    setIsModalActive(true);
    setIsEditMode(false);
  }

  function onModalClose() {
    setIsModalActive(false);
  }

  function saveNewOrEditedExpense(newExpense) {
    if (isEditMode) {
      expenseService.update(newExpense);
      // 1
      setExpenses(expenseService.getAll());
      onExpenseListModified();
    } else {
      expenseService.save(newExpense);

      //2
      const updatedExpenseList = expenseService.getAll();
      setExpenses(updatedExpenseList);
      onExpenseListModified();
    }

    onModalClose();
  }

  function openModalOnEditExpense(toEditExpense) {
    setIsEditMode(true);
    setIsModalActive(true);
    setEditedExpense({ ...toEditExpense });
  }

  function deleteExpense(id) {
    expenseService.deleteExpense(id);

    setExpenses(expenseService.getAll());
    onExpenseListModified();
  }

  return (
    <>
      <div className="flex align-items-center transactions-container container-med">
        <div className="container-top-side">
          <h2 className="m-0 p-0">Expense</h2>
          <AiOutlinePlusSquare size="30" className="icon-button" style={{ color: "#1c98f7" }} onClick={openModalOnAdd} />
        </div>
        <div className="box-height">
          {expenses.map((expense) => {
            return (
              <div className="transaction-item" key={expense.id}>
                <div className="w-100">
                  <TransactionItem data={expense} />
                </div>
                <div className="transaction-item-buttons m-l-40">
                  <AiOutlineEdit size={30} className="icon-button" style={{ color: "#1c98f7" }} onClick={() => openModalOnEditExpense(expense)} />
                  <AiOutlineDelete size={30} className="icon-button" style={{ color: "#fd6f6f" }} onClick={() => deleteExpense(expense.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ExpenseModal isModalActive={isModalActive} isEditMode={isEditMode} editedExpense={editedExpense} onModalClose={onModalClose} savedExpense={saveNewOrEditedExpense} />
    </>
  );
}

export default Expense;
