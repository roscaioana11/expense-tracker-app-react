import React, {useState} from "react";
import "./style/DatePickerStyle.css";
import {RiArrowLeftSLine, RiArrowRightSLine} from "react-icons/ri";
import datepickerService from "../service/datePickerService";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const daily = "Daily";
const weekly = "Weekly";
const monthly = "Monthly";
const yearly = "Yearly";
const customRange = "Custom Range";

const datePickerModes = [daily, weekly, monthly, yearly, customRange];

function DatePicker({onDateChanged}) {
    const [selectedMode, setSelectedMode] = useState(daily);
    const [selectedPeriod, setSelectedPeriod] = useState({startDate: undefined, endDate: undefined});
    const [datePickerOffset, setDatePickerOffset] = useState(0);

    function onDatePicked(period) {
        setSelectedPeriod(period);
        if (onDateChanged) onDateChanged({...period});
    }

    function onModeChange(offset) {
        let newIndex = datePickerModes.indexOf(selectedMode) + offset;

        if (newIndex < 0) {
            newIndex = datePickerModes.length - 1;
        } else if (newIndex >= datePickerModes.length) {
            newIndex = 0;
        }

        setDatePickerOffset(0);
        setSelectedPeriod({startDate: undefined, endDate: undefined});

        setSelectedMode(datePickerModes[newIndex]);
    }

    function onCustomDatePicked(date) {
        if (selectedPeriod.startDate === undefined || selectedPeriod.endDate || selectedPeriod.startDate.getTime() >= date.startDate.getTime()) {
            setSelectedPeriod({startDate: date.startDate, endDate: undefined});
        } else {
            const newDate = {...selectedPeriod, endDate: date.endDate};

            setSelectedPeriod(newDate);
            if (onDateChanged) onDateChanged({...newDate});
        }
    }

    function onArrwoPressed(offset) {
        setDatePickerOffset(datePickerOffset + offset);
    }

    function generateOptions(selectedOption) {
        switch (selectedOption) {
            case daily:
                return generateDailyOptions();
            case weekly:
                return generateWeeklyOptions();
            case monthly:
                return generateMonthlyOptions();
            case yearly:
                return generateYearlyOptions();
            case customRange:
                return generateCustomRangeOptions();
        }
    }

    function generateDailyOptions() {
        const result = datepickerService.generateDailyOptionsData(datePickerOffset);
        return result.map((day, i) => {
            const isSelected = datepickerService.isSamePeriod(selectedPeriod, day);

            return (
                <li key={i} onClick={() => onDatePicked(day)}
                    className={`flex flex-col ${isSelected ? "date-picker-item-selected" : ""}`}>
          <span className="opac-60">
            {day.startDate.getFullYear()} {monthNames[day.startDate.getMonth()]}
          </span>
                    <span className="f-size20">
            {weekDays[day.startDate.getDay()]} {day.startDate.getDate()}
          </span>
                </li>
            );
        });
    }

    function generateWeeklyOptions() {
        const result = datepickerService.generateWeeklyOptionsData(datePickerOffset);

        return result.map((week, i) => {
            const isSelected = datepickerService.isSamePeriod(selectedPeriod, week);

            const isSameYear = week.startDate.getFullYear() === week.endDate.getFullYear();

            return (
                <li key={i} onClick={() => onDatePicked(week)}
                    className={`flex flex-col ${isSelected ? "date-picker-item-selected" : ""}`}>
          <span className="opac-60">
            {week.startDate.getFullYear()} {isSameYear ? "" : "- " + week.endDate.getFullYear()}
          </span>
                    <span className="f-size20">
            {monthShortNames[week.startDate.getMonth()]} {week.startDate.getDate()} - {monthShortNames[week.endDate.getMonth()]} {week.endDate.getDate()}
          </span>
                </li>
            );
        });
    }

    function generateMonthlyOptions() {
        const result = datepickerService.generateMonthlyOptionsData(datePickerOffset);

        return result.map((month, i) => {
            const isSelected = datepickerService.isSamePeriod(selectedPeriod, month);

            return (
                <li key={i} onClick={() => onDatePicked(month)}
                    className={`flex flex-col ${isSelected ? "date-picker-item-selected" : ""}`}>
                    <span className="opac-60">{month.startDate.getFullYear()}</span>
                    <span className="f-size20">{monthNames[month.startDate.getMonth()]}</span>
                </li>
            );
        });
    }

    function generateYearlyOptions() {
        const result = datepickerService.generateYearlyOptionsData(datePickerOffset);

        return result.map((year, i) => {
            const isSelected = datepickerService.isSamePeriod(selectedPeriod, year);

            return (
                <li key={i} onClick={() => onDatePicked(year)}
                    className={`flex flex-col ${isSelected ? "date-picker-item-selected" : ""}`}>
                    <span className="f-size20">{year.startDate.getFullYear()}</span>
                </li>
            );
        });
    }

    function generateCustomRangeOptions() {
        const result = datepickerService.generateDailyOptionsData(datePickerOffset);
        return result.map((day, i) => {
            let isSelected = false;

            if (selectedPeriod.startDate && !selectedPeriod.endDate && selectedPeriod.startDate.getTime() === day.startDate.getTime()) {
                isSelected = true
            }

            if ((selectedPeriod.startDate && selectedPeriod.startDate.getTime() <= day.startDate.getTime()) && (selectedPeriod.endDate && selectedPeriod.endDate.getTime() >= day.endDate.getTime())) {
                isSelected = true;
            }

            return (
                <li key={i} onClick={() => onCustomDatePicked(day)}
                    className={`flex flex-col ${isSelected ? "date-picker-item-selected" : ""}`}>
          <span className="opac-60">
            {day.startDate.getFullYear()} {monthNames[day.startDate.getMonth()]}
          </span>
                    <span className="f-size20">
            {weekDays[day.startDate.getDay()]} {day.startDate.getDate()}
          </span>
                </li>
            );
        });
    }

    const timePickerOptions = generateOptions(selectedMode);

    return (
        <>
            <div className="w-100">
                <div style={{alignItems: "center"}} className="flex flex-end opac-60 m-r-20">
                    <RiArrowLeftSLine onClick={() => onModeChange(-1)} className="icon-button" size={20}/>
                    <span>{selectedMode}</span>
                    <RiArrowRightSLine onClick={() => onModeChange(1)} className="icon-button" size={20}/>
                </div>
                <div className="date-picker-container w-100 flex">
                    <RiArrowLeftSLine onClick={() => onArrwoPressed(-1)} className="icon-button" size={70}/>
                    <ul className="flex w-100">{timePickerOptions}</ul>
                    <RiArrowRightSLine onClick={() => onArrwoPressed(1)} className="icon-button" size={70}/>
                </div>
            </div>
        </>
    );
}

export default DatePicker;
