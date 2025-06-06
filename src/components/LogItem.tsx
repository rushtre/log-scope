import { IoWarning } from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5";
import { IoMdBug } from "react-icons/io";
import { PiWarningOctagonFill } from "react-icons/pi";
import { BsFillQuestionSquareFill } from "react-icons/bs";






export interface logProps {
    id: string,
    level: string,
    source: string,
    timestamp: string,
    message: string,
}

export default function LogItem(
    {
        level,
        source,
        timestamp,
        message
    }: logProps) {

    // Format timestamp - M/D/Y, 0:00:00 PM
    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    // Change font color based on level
    function getLevelColor(level: string): string {
        switch (level) {
            case 'ERROR':
                return '#e74c3c';
            case 'WARN':
                return '#f39c12';
            case 'INFO':
                return '#3498db';
            case 'DEBUG':
                return '#95a5a6';
            default:
                return '#2c3e50';
        }
    }

    // Change icon based on level
    function getLevelIcon(level: string) {
        switch (level) {
            case 'ERROR':
                return <IoWarning size={16} />;
            case 'WARN':
                return <PiWarningOctagonFill size={16} />;
            case 'INFO':
                return <IoInformationCircle size={16} />;
            case 'DEBUG':
                return <IoMdBug />;
            default:
                return <BsFillQuestionSquareFill size={16} />;
        }
    }

    return (
        // A single log row
        <div className="log-item-container">
            <div className="log-item-attribute">
                <span style={{ color: getLevelColor(level) }} className="log-item-icon">{getLevelIcon(level)}</span>
                <span style={{ color: getLevelColor(level) }} className="log-item-level">{level}</span>
            </div>
            <div className="log-item-attribute">
                <span style={{ color: "green" }}>{source}</span>
            </div>
            <div className="log-item-attribute">
                <span style={{ color: "grey" }}>{formatTimestamp(timestamp)}</span>
            </div>
            <div className="log-item-attribute">
                <span>{message}</span>
            </div>
        </div>
    )
}