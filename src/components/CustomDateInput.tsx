import DatePicker from "react-datepicker";
import { enUS } from 'date-fns/locale';
import { CiCalendar } from "react-icons/ci";
import React  from "react";
import {CustomDateInput} from "@/services/types";

export default function CustomDateInput(
    {
        startDate,
        endDate,
        onStartDateChange,
        onEndDateChange,
    }: CustomDateInput
) {

    const DateInput = React.forwardRef<HTMLDivElement, {
        value?: string;
        onClick?: () => void;
        icon: React.ReactNode;
        placeholder?: string;
        text: string
    }>(({ value, onClick, icon, placeholder, text }, ref) => (
        <div
            onClick={onClick}
            ref={ref }
            className="custom-input-container"
        >
            <span className={"custom-input-icon"}>{icon}</span>
            <span className={"custom-input-value"}>{value || text}</span>
        </div>
    ));



    return (
        <div className={"custom-react-datetime-picker-container"}>
            <div className={"custom-react-datetime-picker"}>
                <DatePicker
                    selected={startDate}
                    dateFormat="MM/dd/yyyy HH:mm"
                    customInput={<DateInput icon={<CiCalendar size={25}/>} placeholder={"Start Date"} text={"Start Date"}/>}
                    locale={enUS}
                    onChange={onStartDateChange}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={10}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    maxDate={new Date()}
                    isClearable
                />
            </div>
            <span>to</span>
            <div className={"custom-react-datetime-picker"}>
                <DatePicker
                    selected={endDate}
                    dateFormat="MM/dd/yyyy HH:mm "
                    customInput={<DateInput icon={<CiCalendar size={25}/>} placeholder={"End Date"} text={"End Date"} />}
                    locale={enUS}
                    onChange={onEndDateChange}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={10}
                    showTimeSelect
                    timeFormat="HH:mm"
                    maxDate={new Date()}
                    timeIntervals={15}
                    isClearable
                />
            </div>
        </div>
    )
}