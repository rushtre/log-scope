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

export interface SearchBar {
    searchFilters: SearchFilters;
    onSearchUpdate: (filters: Partial<SearchFilters>) => void;
}

export interface CustomDateInput {
    startDate: Date | null,
    endDate: Date | null,
    onStartDateChange : (date: Date | null ) => void,
    onEndDateChange : (date: Date | null) => void,
}

export interface VirtualScrollContainer{
    logs: LogEntry[],
    itemHeight: number,
    containerHeight: number,
    sortConfig: SortConfig,
    onSortChange: (sortBy: SortConfig['sortBy'], order?: SortConfig['order']) => void;
    onSearchUpdate: (filters: Partial<SearchFilters>) => void;
    searchFilters: SearchFilters;
    overscan?: number,
}

export interface SearchFilters {
    levels: string[];
    methods: string[];
    searchText: string;
    startDate: Date | null;
    endDate: Date | null;
}

export interface SortConfig {
    sortBy: 'timestamp' | 'level' | 'source' | 'method';
    order: 'asc' | 'desc';
}