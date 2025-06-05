interface logProps {
    level: "ERROR" | "WARN" | "INFO" | "DEBUG",
    source: string,
    timestamp: string,
    message: string,
}

function LogItem({ level, source, timestamp, message }: logProps) {


    return (
        // A single log row
        <div className="log-item-container">
            <div className="log-item-level">
                <img src="" />
                <span>{level}</span>
            </div>
            <div className="log-item-source">
                <h3>{source}</h3>
            </div>
            <div className="log-item-timestamp">
                <h3>{timestamp}</h3>
            </div>
            <div className="log-item-message">
                <h3>{message}</h3>
            </div>
        </div>
    )
}

export default LogItem; 