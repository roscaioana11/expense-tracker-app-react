import {v4 as uuidv4} from "uuid";

const allIncomesKey = 'allIncomes';

const incomeService = {

    getEmptyIncome: function () {
        return {
            name: "",
            dateAdded: "",
            dateLastUpdated: "",
            currency: "",
            amount: ""
        };
    },

    getAll: function () {
        const allIncomes = JSON.parse(localStorage.getItem(allIncomesKey));
        return allIncomes ? allIncomes : [];
    },

    getById: function (incomeId) {
        let allIncomes = this.getAll();

        for (const income of allIncomes) {
            if (income.id === incomeId) {
                return income;
            }
        }
        return undefined;
    },

    save: function (income) {
        income.dateAdded = new Date();
        income.dateLastUpdated = new Date();

        let allIncomes = this.getAll();

        allIncomes.push({...income, id: uuidv4()});

        localStorage.setItem(allIncomesKey, JSON.stringify(allIncomes));
    },

    update: function (updatedIncome) {
        updatedIncome.dateLastUpdated = new Date();
        let allIncomes = this.getAll();

        allIncomes = allIncomes.map((income) => {
            if (updatedIncome.id === income.id) {
                return {...updatedIncome};
            }
            return income;
        });
        localStorage.setItem(allIncomesKey, JSON.stringify(allIncomes));
    },

    deleteIncome: function (incomeId) {
        let allIncomes = this.getAll();

        allIncomes = allIncomes.filter(income => income.id !== incomeId);
        localStorage.setItem(allIncomesKey, JSON.stringify(allIncomes));
    },

    getTotalAmountBySelectedDate: function (startDate, endDate) {
        let allIncomes = this.getAll();
        let totalAmount = 0;

        allIncomes.forEach(income => {

            if (!startDate || !endDate || (new Date(income.dateAdded).getTime() >= startDate.getTime() && new Date(income.dateAdded).getTime() <= endDate.getTime())) {
                totalAmount += income.amount;
            }
        });

        return totalAmount;
    }
}

export default incomeService;
