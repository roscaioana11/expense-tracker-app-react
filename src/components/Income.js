import React, { useState } from "react";
import "./ExpenseIncomeStyle.css";
import { AiOutlinePlusSquare, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import TransactionItem from "./TransactionItem";
import IncomeModal from "./modals/IncomeModal";
import incomeService from "../service/incomeService";

function Income( { onIncomeListModified } ) {
  let [incomes, setIncomes] = useState(incomeService.getAll());
  const [editedIncome, setEditedIncome] = useState(incomeService.getEmptyIncome());
  const [isModalActive, setIsModalActive] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  function openModalOnAdd() {
    setIsModalActive(true);
    setIsEditMode(false);
  }

  function onModalClose() {
    setIsModalActive(false);
  }

  function saveNewOrEditedIncome(newIncome) {
    if (isEditMode) {
      incomeService.update(newIncome);
      setIncomes(incomeService.getAll());
      onIncomeListModified();
    } else {
      // newIncome.id = uuidv4();
      // // create a new array with all the previous elements + the new element
      // const updatedIncomeList = [...incomes, newIncome];
      incomeService.save(newIncome);
      setIncomes(incomeService.getAll());
      onIncomeListModified();
    }

    onModalClose();
  }

  function openModalOnEditIncome(toEditIncome) {
    setIsEditMode(true);
    setIsModalActive(true);
    setEditedIncome({ ...toEditIncome });
  }

  function deleteIncome(id) {
    incomeService.deleteIncome(id);
    setIncomes(incomeService.getAll());
    onIncomeListModified();
  }

  return (
    <>
      <div className="flex align-items-center transactions-container container-med">
        <div className="container-top-side">
          <h2 className="m-0 p-0">Income</h2>
          <AiOutlinePlusSquare size="30" className="icon-button" style={{ color: "#1c98f7" }} onClick={openModalOnAdd} />
        </div>
        <div className="box-height">
          {incomes.map((income) => {
            return (
              <div className="transaction-item" key={income.id}>
                <div className="w-100">
                  <TransactionItem data={income} />
                </div>
                <div className="transaction-item-buttons m-l-40">
                  <AiOutlineEdit size={30} className="icon-button" style={{ color: "#1c98f7" }} onClick={() => openModalOnEditIncome(income)} />
                  <AiOutlineDelete size={30} className="icon-button" style={{ color: "#fd6f6f" }} onClick={() => deleteIncome(income.id)} />
                  {/*onClick => if your function has parameters, you have to add () => */}
                  {/*if your function has no parameters, you just call the function name*/}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <IncomeModal isModalActive={isModalActive} isEditMode={isEditMode} editedIncome={editedIncome} onModalClose={onModalClose} savedIncome={saveNewOrEditedIncome} />
    </>
  );
}

export default Income;
