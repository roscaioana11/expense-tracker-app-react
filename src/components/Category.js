import React, {useState} from "react";
import "./ExpenseIncomeStyle.css";
import {AiOutlinePlusSquare} from "react-icons/ai";
import categoryService from "../service/categoryService";
import CategoryModal from "./modals/CategoryModal";

function Category() {
    let [categories, setCategory] = useState(categoryService.getAll());
    const [isModalActive, setIsModalActive] = useState(false);

    function openModalOnAdd() {
        setIsModalActive(true);
    }

    function onModalClose() {
        setIsModalActive(false);
    }

    function saveNewCategory(newCategory) {
        categoryService.save(newCategory);
        setCategory(categoryService.getAll());

        onModalClose();
    }

    return (
        <>
            <div className="flex align-items-center transactions-container container-small">
                <div className="container-top-side">
                    <h2 className="m-0 p-0">Category</h2>
                    <AiOutlinePlusSquare size="30" className="icon-button" style={{color: "#1c98f7"}}
                                         onClick={openModalOnAdd}/>
                </div>
                <div className="box-height">
                    {categories.map((category) => {
                        return (
                            <div className="category-item" key={category.id}>
                                <div className="w-100">
                                    {category.name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <CategoryModal isModalActive={isModalActive} onModalClose={onModalClose} savedCategory={saveNewCategory}/>
        </>
    );
}

export default Category;
