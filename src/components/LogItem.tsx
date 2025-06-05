export interface logProps {
    id: string,
    level: "ERROR" | "WARN" | "INFO" | "DEBUG",
    source: string,
    timestamp: string,
    message: string,
}

export default function LogItem({ level, source, timestamp, message }: logProps) {

    // Format timestamp - M/D/Y, 0:00:00 PM
    function formatTimestamp(timestamp: string): string {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        // A single log row
        <div className="log-item-container">
            <div className="log-item-level">
                <img src="" />
                <span>{level}</span>
            </div>
            <div className="log-item-source">
                <span>{source}</span>
            </div>
            <div className="log-item-timestamp">
                <span>{formatTimestamp(timestamp)}</span>
            </div>
            <div className="log-item-message">
                <span>{message}</span>
            </div>
        </div>
    )
}