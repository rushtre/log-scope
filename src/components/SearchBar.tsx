import React, {useState} from "react";
import {SearchBar} from "@/services/types";
import CustomDateInput from "@/components/CustomDateInput";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiMagnifyingGlassThin } from "react-icons/pi";



const SearchBar: React.FC<SearchBar> = (
    {
        level,
        method,
        searchText,
        onSearchTextChange,
        onLevelChange,
        onMethodChange
    }: SearchBar)=> {

    const [startingDate, setStartingDate] = useState<Date | null>(null);
    const [endingDate, setEndingDate] = useState<Date | null>(null);
    const [startingTime, setStartingTime] = useState<Date | null>(null);
    const [endingTime, setEndingTime] = useState<Date | null>(null);

    const levelFilter = level ?? [];
    const methodFilter = method ?? [];

    const levelOptions = ['DEBUG', 'ERROR', 'INFO', 'WARN'] as const;
    const methodOptions = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'] as const;

    const onSearchButton = () => {}

    function capitalize(word: string): string{
        if (!word) return '';
        return word[0] + word.slice(1).toLowerCase();
    }

    return (
        <div className="search-bar-container">
            <div className="search-bar-input-container">
                <div className={"search-bar-custom-input-container"}>
                    <input type="text" className={"search-bar-custom-input"}/>
                    <PiMagnifyingGlassThin className={"magnifying-glass"}  size={20}/>
                </div>
                <CustomDateInput
                    startDate={startingDate}
                    endDate={endingDate}
                    startTime={startingTime}
                    endTime={endingTime}
                    onStartDateChange={setStartingDate}
                    onEndDateChange={setEndingDate}
                    onStartTimeChange={setStartingTime}
                    onEndTimeChange={setEndingTime}
                />
            </div>
            <div className="search-bar-filter-container">
                <div className="search-bar-filter-options-container">
                    <div className="search-bar-filter-level-container">
                        <span className="filter-label">Level:</span>
                        <div className="search-bar-filter-level-options">
                            {levelOptions.map(levelOption => (
                                <div key={levelOption} className="filter-button-container">
                                    <button className="filter-button">{capitalize(levelOption)}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="search-bar-filter-method-container">
                        <span className="filter-label">Method:</span>
                        <div className="search-bar-filter-method-options">
                            {methodOptions.map(methodOption => (
                                <div key={methodOption} className="filter-button-container">
                                    <div key={methodOption} className="filter-button-container">
                                        <button className="filter-button">{capitalize(methodOption)}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="search-bar-search-button" onClick={onSearchButton}>Search</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;