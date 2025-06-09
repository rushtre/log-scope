import { useState } from "react";
import LogEntry from "@/components/LogEntry";
import SearchBar from "@/components/SearchBar";
import {LogsContainer, } from "@/services/types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function LogsContainer(
    {
        logs,
        logFirstIndex,
        logLastIndex,
        currentPage,
        totalPages,
        onPageChange
    }: LogsContainer) {

    const [isTransitioning, setIsTransitioning] = useState(false);
    const handlePageChange = (page: number) => {
        setIsTransitioning(true);

        setTimeout(() => {
            onPageChange(page);
            setIsTransitioning(false);
        }, 500);
    };

    return (

        // List of log items
        <div className="logs-container">
            <div className="logs-hero">
                <text>Total : {logs.length * totalPages}</text>
                <SearchBar/>
            </div>
            <div className="logs-title-container">
                <span className="logs-title">Level</span>
                <span className="logs-title">Source</span>
                <span className="logs-title">Timestamp</span>
                <span className="logs-title">Message</span>
            </div>
            <div className={`logs-list ${isTransitioning ? 'transitioning' : ''}}`}>
                {logs.map((log, index) => (
                    <LogEntry key={log.id} {...log}/>
                ))}
            </div>
            <div className="logs-footer-container">
                <div className="logs-count">
                    <text>{logFirstIndex + 1} - {logLastIndex}</text>
                </div>

                {/* Page navigation */}
                <div className="logs-pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack size={15} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoIosArrowForward size={15} />
                    </button>
                </div>
            </div>
        </div>
    )
}