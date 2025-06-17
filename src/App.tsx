import { useMemo, useState} from "react";
import log_data from "./data/log_data.json";
import "./index.css";
import {LogSearchEngine} from "@/services/LogSearchEngine";
import { BsTerminal } from "react-icons/bs";
import {LogEntry, SearchFilters, SortConfig} from "@/services/types";
import VirtualScrollContainer from "@/components/VirtualScrollContainer";





export function App() {

  const [logs] = useState<LogEntry[]>(log_data.logs)

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    levels: [],
    methods: [],
    searchText: '',
    startDate: null,
    endDate: null,
  })

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    sortBy: 'timestamp',
    order: 'desc'
  })
  
  const searchEngine= useMemo(() => new LogSearchEngine(logs), [logs])

  const processedLogs = useMemo(() => {
    const startTime = performance.now()
    const results = searchEngine.searchAndSort(
        searchFilters,
        sortConfig.sortBy,
        sortConfig.order,
    );

    const duration = performance.now() - startTime;
    return results;
  }, [searchEngine, searchFilters, sortConfig, logs])

  const handleSearchUpdate = (newFilters: Partial<SearchFilters>) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSort = (
      sortBy: SortConfig['sortBy'],
      order?: SortConfig['order'],
  ) => {
    setSortConfig(prev => ({
      sortBy,
      order: order || (prev.sortBy === sortBy && prev.order === 'desc' ? 'asc' : 'desc' ),
    }));
  }


  return (
    <div className="app">
      <div className="main-container">
        <div className="sub-container">
          <div className="title-container">
            <span><BsTerminal size={25} /></span>
            <h3>Logs</h3>
          </div>
         <VirtualScrollContainer
             logs={processedLogs}
             itemHeight={60}
             sortConfig={sortConfig}
             onSortChange={handleSort}
             searchFilters={searchFilters}
             onSearchUpdate={handleSearchUpdate}
             containerHeight={600}
             overscan={3}/>
        </div>
      </div>
    </div>
  );
}
