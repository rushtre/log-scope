export interface LogEntry {
    id: string,
    level: string,
    source: string,
    timestamp: string,
    method: string | null,
    message: string,
    user_id: string | null,
    ip_address: string | null,
    response_time: number | null,
    status_code: number | null,
    endpoint: string | null,
    application: string | null,
    tags?: string[],
}

export interface LogsContainer {
    logs: LogEntry[],
    logFirstIndex: number,
    logLastIndex: number,
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

export interface SearchBar{
    level?: ("ERROR" | "WARN" | "INFO" | "DEBUG")[];
    method?: ("POST" | "GET" | "PUT" | "PATCH" | "DELETE")[];
    searchText?: string,
    onSearchTextChange?: (text: string) => void,
    onLevelChange?: (levels: ("ERROR" | "WARN" | "INFO" | "DEBUG")[]) => void,
    onMethodChange?: (methods: ("POST" | "GET" | "PUT" | "PATCH" | "DELETE")[]) => void
}

export interface CustomDateInput {
    startDate: Date | null,
    endDate: Date | null,
    startTime: Date | null,
    endTime: Date | null,
    onStartDateChange : (date: Date | null ) => void,
    onEndDateChange : (date: Date | null) => void,
    onStartTimeChange : (date: Date | null) => void,
    onEndTimeChange : (date: Date | null) => void
}