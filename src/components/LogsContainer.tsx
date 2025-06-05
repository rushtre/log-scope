import LogItem, { logProps } from "./LogItem";

interface LogsContainerProps {
    // Array of log item objects
    logs: logProps[];
}

function LogsContainer({ logs }: LogsContainerProps) {

    return (
        <div className="logs-container">
            <div className="logs-title-container">
                <div className="logs-title">Level</div>
                <div className="logs-title">Source</div>
                <div className="logs-title">Timestamp</div>
                <div className="logs-title">Message</div>
            </div>
            <div className="logs-list">
                {logs.map(log => (
                    <LogItem key={log.id} {...log} />
                ))}
            </div>
        </div>
    )
}