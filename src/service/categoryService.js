import {v4 as uuidv4} from "uuid";

const allCategoriesKey = 'allCategories';

const categoryService = {

    getEmptyCategory: function () {
        return {
            name: "",
        };
    },

    getAll: function () {
        const allCategories = JSON.parse(localStorage.getItem(allCategoriesKey));
        return allCategories ? allCategories : [];
    },

    getById: function (categoryIdId) {
        let allCategories = this.getAll();

        for (const category of allCategories) {
            if (category.id === categoryIdId) {
                return category;
            }
        }
        return undefined;
    },

    save: function (category) {
        let allCategories = this.getAll();

        allCategories.push({ ...category, id: uuidv4() });

        localStorage.setItem(allCategoriesKey, JSON.stringify(allCategories));
    }
}

export default categoryService;
