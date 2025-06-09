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
    startDate?: Date,
    endDate?: Date,

}