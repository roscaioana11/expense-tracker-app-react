import React, {useEffect, useState} from "react";
import "./modals.css";
import Button from "@mui/material/Button";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {TextField} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import categoryService from "../../service/categoryService";
import currencyService from "../../service/currencyService";

const resetModalValues = {
    name: "",
    dateAdded: "",
    dateLastUpdated: "",
    currency: "",
    amount: 0,
    categoryName: "",
};

function ExpenseModal({isModalActive, onModalClose, savedExpense, editedExpense, isEditMode}) {
    const [expense, setExpense] = useState(resetModalValues);

    useEffect(() => {
        if (isEditMode) {
            setExpense({...editedExpense});
        }
    }, [editedExpense]);

    if (!isModalActive) {
        return;
    }

    function saveNewExpense() {
        // TODO add validation
        // {...expense} copy all the expanse keys into a new object
        savedExpense({...expense});
        setExpense(resetModalValues);
    }

    function closeModal() {
        onModalClose();
        setExpense(resetModalValues);
    }

    const categories = categoryService.getAll();
    const currencies = currencyService.getAll();
    console.log(categories);

    return (
        <>
            <div className="modal-mask">
                <div className="modal-container">
                    <div className="w-100 flex flex-right">
                        <AiOutlineCloseCircle className="icon-button" style={{color: "#ef1f1f"}} size="50"
                                              onClick={closeModal}/>
                    </div>
                    <div>
                        <TextField className="flex" sx={{m: "10px"}} type="text" label="Name"
                                   autoComplete="Expense Name" variant="standard" value={expense.name}
                                   onChange={(event) => setExpense({...expense, name: event.target.value})}/>
                        <FormControl className="flex m-10" variant="standard" sx={{m: "10px", minWidth: 120}}>
                            <InputLabel id="expense-currency-label">Currency</InputLabel>
                            <Select className="w-100" labelId="expense-currency-label" id="expense-currency"
                                    label="Currency" value={expense.currency}
                                    onChange={(event) => setExpense({...expense, currency: event.target.value})}>
                                <MenuItem key="empty" value="">
                                    <em>None</em>
                                </MenuItem>
                                {currencies.map((currency, i) => {
                                    return (
                                        <MenuItem key={i} value={currency}>
                                            {currency}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField className="flex m-10" sx={{m: "10px"}} type="number" label="Amount" autoComplete="0"
                                   variant="standard" value={expense.amount}
                                   onChange={(event) => setExpense({...expense, amount: Number(event.target.value)})}/>
                        <FormControl className="flex m-10" variant="standard" sx={{m: "10px", minWidth: 120}}>
                            <InputLabel id="expense-category-label">Category</InputLabel>
                            <Select className="w-100" labelId="expense-category-label" id="expense-category"
                                    label="Category" value={expense.categoryName}
                                    onChange={(event) => setExpense({...expense, categoryName: event.target.value})}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {categories.map((category) => {
                                    return (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex flex-center-content m-10">
                        <Button variant="contained" onClick={saveNewExpense}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExpenseModal;
