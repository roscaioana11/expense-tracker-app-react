import React, {useState} from "react";
import "./modals.css";
import Button from "@mui/material/Button";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {TextField} from "@mui/material";

const resetModalValues = {
    name: "",
};

function CategoryModal({isModalActive, onModalClose, savedCategory}) {
    const [category, setCategory] = useState(resetModalValues);

    if (!isModalActive) {
        return;
    }

    function saveNewCategory() {
        // TODO add validation
        savedCategory({...category});
        setCategory(resetModalValues);
    }

    function closeModal() {
        onModalClose();
        setCategory(resetModalValues);
    }

    return (
        <>
            <div className="modal-mask">
                <div className="modal-container">
                    <div className="flex flex-right">
                        <AiOutlineCloseCircle className="icon-button" style={{color: "#ef1f1f"}} size="50"
                                              onClick={closeModal}/>
                    </div>
                    <div>
                        <TextField className="flex" sx={{m: "10px"}}
                                   onChange={(event) => setCategory({...category, name: event.target.value})}
                                   label="Category Name" type="text" autoComplete="Category Name" variant="standard"/>
                    </div>
                    <div className="flex flex-center-content m-10">
                        <Button variant="contained" onClick={saveNewCategory}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryModal;
