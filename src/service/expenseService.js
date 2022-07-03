import {v4 as uuidv4} from "uuid";

const allExpensesKey = 'allExpenses';

const expenseService = {

    getEmptyExpense: function () {
        return {
            name: "",
            dateAdded: "",
            dateLastUpdated: "",
            currency: "",
            amount: 0,
            categoryName: "",
        };
    },

    getAll: function () {
        const allExpenses = JSON.parse(localStorage.getItem(allExpensesKey));
        return allExpenses ? allExpenses : [];
    },

    getById: function (expenseId) {
        let allExpenses = this.getAll();

        for (const expense of allExpenses) {
            if (expense.id === expenseId) {
                return expense;
            }
        }
        return undefined;
    },

    save: function (expense) {
        expense.dateAdded = new Date();
        expense.dateLastUpdated = new Date();
        let allExpenses = this.getAll();

        allExpenses.push({...expense, id: uuidv4()});

        localStorage.setItem(allExpensesKey, JSON.stringify(allExpenses));
    },

    update: function (updatedExpense) {
        updatedExpense.dateLastUpdated = new Date();
        let allExpenses = this.getAll();

        allExpenses = allExpenses.map((expense) => {
            if (updatedExpense.id === expense.id) {
                return {...updatedExpense};
            }
            return expense;
        });
        localStorage.setItem(allExpensesKey, JSON.stringify(allExpenses));
    },

    deleteExpense: function (expenseId) {
        let allExpenses = this.getAll();

        allExpenses = allExpenses.filter(expense => expense.id !== expenseId);
        localStorage.setItem(allExpensesKey, JSON.stringify(allExpenses));
    },

    getTotalAmountBySelectedDate: function (startDate, endDate) {
        let allExpenses = this.getAll();
        let totalAmount = 0;

        allExpenses.forEach(expense => {

            if (!startDate || !endDate || (new Date(expense.dateAdded).getTime() >= startDate.getTime() && new Date(expense.dateAdded).getTime() <= endDate.getTime())) {
                totalAmount += expense.amount;
            }
        });

        return totalAmount;
    }
}

export default expenseService;
