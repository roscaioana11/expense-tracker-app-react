import React, {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import UserContext from "../../Context";
import Expense from "../Expense";
import Income from "../Income";
import "./DashboardPageStyle.css";
import DatePicker from "../DatePicker";
import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip} from "chart.js";
import polarAreaChartService from "../../service/polarAreaChartService";
import Category from "../Category";
import expenseService from "../../service/expenseService";
import TotalAmountComponent from "../totalAmountComponent";
import {ImArrowDown, ImArrowUp} from "react-icons/im";
import incomeService from "../../service/incomeService";
import userSerivce from "../../service/userSerivce";
import PieChart from "../../chart/pieChartComponent";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

function DashboardPage() {
    const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);

    // const [totalAmountExpense, setTotalAmountExpense] = useState(expenseService.getTotalAmountBySelectedDate());
    const [totalAmountIncome, setTotalAmountIncome] = useState(incomeService.getTotalAmountBySelectedDate(undefined, undefined));
    const [selectedPeriod, setSelectedPeriod] = useState({startDate: undefined, endDate: undefined});
    const [chartData, setChartData] = useState(polarAreaChartService.convertExpensesToPolarData(expenseService.getAll(), selectedPeriod.startDate, selectedPeriod.endDate));

    function handleSubmit() {
        userSerivce.deleteUser();
        setIsLoggedIn(false);
    }

    function onDatePickerDateChange(period) {
        setSelectedPeriod({...period});
        setChartData(polarAreaChartService.convertExpensesToPolarData(expenseService.getAll(), period.startDate, period.endDate));
    }

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }

    function onExpenseListModified() {
        setChartData(polarAreaChartService.convertExpensesToPolarData(expenseService.getAll(), selectedPeriod.startDate, selectedPeriod.endDate));
    }

    function onIncomeListModified() {
        setTotalAmountIncome(incomeService.getTotalAmountBySelectedDate(selectedPeriod.startDate, selectedPeriod.endDate));
    }

    return (
        <>
            <div className="dashboard-page vh-100 w-100 ">
                <div className="navbar w-100">
                    <input type="button" value="Logout" onClick={handleSubmit} style={{color: "#fffdfd"}}
                           className="logout-button"/>
                </div>

                <div className="w-100 dashboard-content">
                    <DatePicker onDateChanged={onDatePickerDateChange}/>
                    <div style={{paddingBottom: "20px"}}>
                        <div className="w-100 flex flex-space-even">
                            <div className="container-big flex">
                                <div style={{width: "100%", height: "380px"}}>
                                    {chartData.length > 0 && <PieChart
                                        chartData={chartData}/>
                                    }
                                    {chartData.length === 0 &&
                                        <h2 style={{textAlign: "center", lineHeight: "300px"}}>No data</h2>

                                    }
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <TotalAmountComponent
                                    icon={<ImArrowDown size={30} style={{color: "#fd6f6f"}}/>}
                                    amount={expenseService.getTotalAmountBySelectedDate(selectedPeriod.startDate, selectedPeriod.endDate)}
                                    description={"Expenses in this period"}/>
                                <TotalAmountComponent
                                    icon={<ImArrowUp size={30} style={{color: "#fd6f6f"}}/>}
                                    amount={incomeService.getTotalAmountBySelectedDate(selectedPeriod.startDate, selectedPeriod.endDate)}
                                    description={"Income in this period"}/>
                            </div>
                            <div className="w-17_5 flex m-10 flex-center-content">
                                <Category/>
                            </div>
                        </div>
                        <div className="flex m-t-50 flex-space-around">
                            <div className="w-35 flex ">
                                <Expense onExpenseListModified={onExpenseListModified}/>
                            </div>
                            <div className="w-35 flex ">
                                <Income onIncomeListModified={onIncomeListModified}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
