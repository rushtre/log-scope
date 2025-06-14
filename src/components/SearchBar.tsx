import React, {useState} from "react";
import {SearchBar, SearchFilters} from "@/services/types";
import CustomDateInput from "@/components/CustomDateInput";
import { PiMagnifyingGlassThin } from "react-icons/pi";

const SearchBar: React.FC<SearchBar> = (
    {
       searchFilters,
        onSearchUpdate,
    })=> {

    const [searchText, setSearchText] = useState("");

    const levelOptions = ['DEBUG', 'ERROR', 'INFO', 'WARN'] as const;
    const methodOptions = ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'] as const;

    function capitalize(word: string): string{
        if (!word) return '';
        return word[0] + word.slice(1).toLowerCase();
    }

    // Handle level filter toggle
    const handleLevelToggle = (level: string) => {
        const currentLevels = searchFilters.levels;
        const newLevels = currentLevels.includes(level)
            ? currentLevels.filter(l => l !== level)
            : [...currentLevels, level];

        onSearchUpdate({ levels: newLevels });
    };

    // Handle method filter toggle
    const handleMethodToggle = (method: string) => {
        const currentMethods = searchFilters.methods;
        const newMethods = currentMethods.includes(method)
            ? currentMethods.filter(m => m !== method)
            : [...currentMethods, method];

        onSearchUpdate({ methods: newMethods });
    };

    // Handle text search
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        onSearchUpdate({ searchText: value });
    };

    // Handle date changes
    const handleStartDateChange = (date: Date | null) => {
        onSearchUpdate({ startDate: date });
    };
    const handleEndDateChange = (date: Date | null) => {
        onSearchUpdate({ endDate: date });
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSearchText('');
        onSearchUpdate({
            levels: [],
            methods: [],
            searchText: '',
            startDate: null,
            endDate: null
        });
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-input-container">
                <div className={"search-bar-custom-input-container"}>
                    <input type="text" className={"search-bar-custom-input"} value={searchText} onChange={handleSearchTextChange}/>
                    <PiMagnifyingGlassThin className={"magnifying-glass"}  size={20}/>
                </div>
                <CustomDateInput
                    startDate={searchFilters.startDate}
                    endDate={searchFilters.endDate}
                    onStartDateChange={handleStartDateChange}
                    onEndDateChange={handleEndDateChange}
                />
            </div>
            <div className="search-bar-filter-container">
                <div className="search-bar-filter-options-container">
                    <div className="search-bar-filter-level-container">
                        <span className="filter-label">Level:</span>
                        <div className="search-bar-filter-level-options">
                            {levelOptions.map(levelOption => (
                                <div key={levelOption} className="filter-button-container">
                                    <button className={`filter-button ${
                                        searchFilters.levels.includes(levelOption) ? 'active' : ''
                                    }`}
                                            onClick={() => handleLevelToggle(levelOption)}
                                    >{capitalize(levelOption)}</button>
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
                                        <button className={`filter-button ${
                                            searchFilters.methods.includes(methodOption) ? 'active' : ''
                                        }`}
                                                onClick={() => handleMethodToggle(methodOption)}>{capitalize(methodOption)}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="search-bar-search-button" onClick={handleClearFilters}>Clear</button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;