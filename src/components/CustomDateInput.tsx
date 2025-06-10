import DatePicker from "react-datepicker";
import { enUS } from 'date-fns/locale';
import { CiCalendar, CiClock2 } from "react-icons/ci";
import React, {useState} from "react";
import {CustomDateInput} from "@/services/types";

export default function CustomDateInput(
    {
        startDate,
        endDate,
        startTime,
        endTime,
        onStartDateChange,
        onEndDateChange,
        onStartTimeChange,
        onEndTimeChange,
    }: CustomDateInput
) {

    const CustomInput = React.forwardRef<HTMLDivElement, {
        value?: string;
        onClick?: () => void;
        icon: React.ReactNode;
        placeholder?: string;
        text: string
    }>(({ value, onClick, icon, placeholder, text }, ref) => (
        <div
            onClick={onClick}
            ref={ref }
            className="custom-date-time-picker"
        >
            <span className={"custom-date-time-picker-icon"}>{icon}</span>
            <span className={"custom-date-time-picker-value"}>{value || text}</span>
        </div>
    ));



    return (
        <div className={"custom-date-time-picker-container"}>
            <div className={"custom-date-time-pick"}>
                <DatePicker
                    selected={startDate}
                    dateFormat="MM/dd/yyyy"
                    customInput={<CustomInput icon={<CiCalendar size={20}/>} placeholder={"Start Date"} text={"Start Date"}/>}
                    locale={enUS}
                    onChange={onStartDateChange}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={10}
                />
                {/*<div className={"custom-time-input-container"}>*/}
                {/*    <span>{<CiClock2 size={20}/>}</span>*/}
                {/*    <input className={"custom-time-input"}*/}
                {/*           type={"time"}*/}
                {/*    />*/}
                {/*</div>*/}
                <span className={"spacer"}></span>
                <DatePicker
                    selected={startTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    customInput={<CustomInput icon={<CiClock2 size={20}/>} text={"Time"} />}
                    locale={enUS}
                    onChange={onStartTimeChange}
                    />
            </div>
            <span>to</span>
            <div className={"custom-date-time-pick"}>
                <DatePicker
                    selected={endDate}
                    dateFormat="MM/dd/yyyy"
                    customInput={<CustomInput icon={<CiCalendar size={20}/>} placeholder={"End Date"} text={"End Date"} />}
                    locale={enUS}
                    onChange={onEndDateChange}

                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={10}
                />
                <span className={"spacer"}></span>
                <DatePicker
                    selected={endTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    customInput={<CustomInput icon={<CiClock2 size={20}/>} text={"Time"} />}
                    locale={enUS}
                    onChange={onEndTimeChange}
                />
            </div>
        </div>
    )
}