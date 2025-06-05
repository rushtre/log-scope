import LogItem, { logProps } from "./LogItem";

export interface LogsContainerProps {
    // Array of log item objects
    logs: logProps[];
}

export default function LogsContainer({ logs }: LogsContainerProps) {

    return (

        // List of log items
        <div className="logs-container">
            <div className="logs-title-container">
                <span className="logs-title">Level</span>
                <span className="logs-title">Source</span>
                <span className="logs-title">Timestamp</span>
                <span className="logs-title">Message</span>
            </div>
            <div className="logs-list">
                {logs.map(log => (
                    <LogItem key={log.id} {...log} />
                ))}
            </div>
        </div>
    )
}