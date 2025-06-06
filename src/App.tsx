import { useState } from "react";
import log_data from "./data/log_data.json";
import "./index.css";
import LogsContainer, { LogsContainerProps } from "./components/LogsContainer";
import { BsFillTerminalFill } from "react-icons/bs";




export function App() {

  const [logs, setLogs] = useState(log_data.logs)
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  // Calculate pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;

  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / logsPerPage);

  return (
    <div className="app">
      <div className="main-container">
        <div className="sub-container">
          <div className="title-container">
            <span><BsFillTerminalFill size={25} /></span>
            <h3>Logs</h3>
          </div>
          <LogsContainer
            logs={currentLogs}
            logFirstIndex={indexOfFirstLog}
            logLastIndex={indexOfLastLog}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default App;
