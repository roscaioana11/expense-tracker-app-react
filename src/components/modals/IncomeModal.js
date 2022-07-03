import React, {useEffect, useState} from "react";
import "./modals.css";
import {Button} from "primereact/button";
import currencyService from "../../service/currencyService";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const resetModalValues = {
    name: "",
    dateAdded: "",
    dateLastUpdated: "",
    currency: "",
    amount: 0,
};

function IncomeModal({isModalActive, onModalClose, savedIncome, editedIncome, isEditMode}) {
    const [income, setIncome] = useState(resetModalValues);

    useEffect(() => {
        if (isEditMode) {
            setIncome({...editedIncome});
        }
        // re-renders when a change is made on any variable that it is inside [ ]
    }, [editedIncome]);

    if (!isModalActive) {
        return;
    }

    function saveNewIncome() {
        // TODO add validation
        // {...income} copy all the income keys into a new object
        savedIncome({...income});
        setIncome(resetModalValues);
    }

    function closeModal() {
        onModalClose();
        setIncome(resetModalValues);
    }

    const currencies = currencyService.getAll();

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
                                   autoComplete="Expense Name" variant="standard" value={income.name}
                                   onChange={(event) => setIncome({...income, name: event.target.value})}/>
                        <FormControl className="flex m-10" variant="standard" sx={{m: "10px", minWidth: 120}}>
                            <InputLabel id="expense-currency-label">Currency</InputLabel>
                            <Select className="w-100" labelId="income-currency-label" id="income-currency"
                                    label="Currency" value={income.currency}
                                    onChange={(event) => setIncome({...income, currency: event.target.value})}>
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
                                   variant="standard" value={income.amount}
                                   onChange={(event) => setIncome({...income, amount: Number(event.target.value)})}/>
                    </div>
                    <div className="flex flex-center-content m-10">
                        <Button variant="contained" onClick={saveNewIncome}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IncomeModal;
