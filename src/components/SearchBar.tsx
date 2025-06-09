import React from "react";
import {SearchBar} from "@/services/types";
import {DateTimePicker} from "@mui/x-date-pickers";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {FaUser} from "react-icons/fa";

const SearchBar: React.FC<SearchBar> = (
    {
        level,
        method,
        searchText,
        startDate,
        endDate,
        // onFiltersChange
    }: SearchBar)=> {

    const levelFilter = level ?? [];
    const methodFilter = method ?? [];

    const levelOptions = ['DEBUG', 'ERROR', 'INFO', 'WARN'] as const;
    const methodOptions = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'] as const;

    const onInputText = (e: React.ChangeEvent<HTMLInputElement>) => { }
    const onSearchButton = () => {}

    return (
        <div className="search-bar-container">
            <div className="search-bar-input-container">
                <div className={"search-bar-custom-input-container"}>
                    <input type="text" className={"search-bar-custom-input"}/>
                    <FaMagnifyingGlass className={"magnifying-glass"} style={{color: "grey"}}/>
                </div>
                {/*<input id={"input"} type={"text"} value={searchText || ''} onChange={onInputText}  placeholder={<FaMagnifyingGlass/>}/>*/}
                {/*<div className="search-bar-date-time-container">*/}
                    <DateTimePicker className="search-bar-date-button" value={startDate} label={"Start"}/>
                    <span>to</span>
                    <DateTimePicker className="search-bar-date-button" value={endDate} label={"End"}/>
                {/*</div>*/}
            </div>
            <div className="search-bar-filter-container">
                <div className="search-bar-filter-options-container">
                    <div className="search-bar-filter-level-container">
                        <span className="filter-label">Level:</span>
                        <div className="search-bar-filter-level-options">
                            {levelOptions.map(levelOption => (
                                <div key={levelOption} className="filter-button-container">
                                    <input
                                        type="checkbox"
                                        id={`level-${levelOption}`}
                                        checked={levelFilter.includes(levelOption)}
                                        className="filter-button"
                                        // onChange handler here
                                    />
                                    <label htmlFor={`level-${levelOption}`}>{levelOption}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="search-bar-filter-method-container">
                        <span className="filter-label">Method:</span>
                        <div className="search-bar-filter-method-options">
                            {methodOptions.map(methodOption => (
                                <div key={methodOption} className="filter-button-container">
                                    <input
                                        type="checkbox"
                                        id={`method-${methodOption}`}
                                        checked={methodFilter.includes(methodOption)}
                                        className="filter-button"
                                        // onChange handler here
                                    />
                                    <label htmlFor={`method-${methodOption}`}>{methodOption}</label>
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