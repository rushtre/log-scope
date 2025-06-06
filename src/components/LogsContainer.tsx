import { useState } from "react";
import LogItem, { logProps } from "./LogItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export interface LogsContainerProps {
    // Array of log item objects
    logs: logProps[],
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

export default function LogsContainer({ logs, currentPage, totalPages, onPageChange }: LogsContainerProps) {


    const [isTransitioning, setIsTransitioning] = useState(false);
    const handlePageChange = (page: number) => {
        setIsTransitioning(true);

        setTimeout(() => {
            onPageChange(page);
            setIsTransitioning(false);
        }, 500); // Half of transition duration
    };

    return (

        // List of log items
        <div className="logs-container">
            <div className="logs-title-container">
                <span className="logs-title">Level</span>
                <span className="logs-title">Source</span>
                <span className="logs-title">Timestamp</span>
                <span className="logs-title">Message</span>
            </div>
            <div className={`logs-list ${isTransitioning ? 'transitioning' : ''}`}>
                {logs.map(log => (
                    <LogItem key={log.id} {...log} />
                ))}
            </div>

            {/* Page navigation */}
            <div className="logs-pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <IoIosArrowBack size={20} />
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
                    <IoIosArrowForward size={20} />
                </button>
            </div>
        </div>
    )
}