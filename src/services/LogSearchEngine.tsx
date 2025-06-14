
import {LogEntry, SearchFilters} from "@/services/types";


export class LogSearchEngine {
    private logs: LogEntry[];
    constructor(logs: LogEntry[]) {
        this.logs = logs;
    }
sort (
    logs: LogEntry[],
    sortBy: 'timestamp' | 'level' | 'source' | 'method',
    order: 'asc' | 'desc' = 'desc',
): LogEntry[] {
        const sortedLogs = [...logs].sort((a, b) => {
            let comparison = 0;

            switch(sortBy) {
                case 'timestamp':
                    comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                    break;
                case 'level':
                    const levelOrder = {ERROR: 4, WARN: 3, INFO: 2, DEBUG: 1};
                    comparison = (levelOrder[a.level as keyof typeof levelOrder] || 0) - (levelOrder[b.level as keyof typeof levelOrder] || 0 )
                    break;
                case 'source':
                    comparison = a.source.localeCompare(b.source)
                    break;
                case 'method':
                    const methodOrder = {POST: 5, PUT: 4, PATCH: 3, GET: 2, DELETE: 1}
                    const aMethod = a.method as keyof typeof methodOrder;
                    const bMethod = b.method as keyof typeof methodOrder;
                    comparison = (methodOrder[aMethod] || 0) - (methodOrder[bMethod] || 0)
                    break;
                default:
                    return 0;
            }
            return order === 'asc' ? comparison : -comparison;
        });

        return sortedLogs;
}

filter(logs: LogEntry[], filters: SearchFilters): LogEntry[] {
        return logs.filter(log => {
            // Level filter
            if (filters.levels && filters.levels.length > 0) {
                if (!filters.levels.includes(log.level)) return false;
            }

            // Method filter
            if (filters.methods && filters.methods.length > 0) {
                if (!log.method || !filters.methods.includes(log.method)) return false;
            }

            // Text search
            if (filters.searchText) {
                const searchLower = filters.searchText.toLowerCase();
                const searchableText = `${log.message} ${log.source} ${log.application || ''}`.toLowerCase();
                if (!searchableText.includes(searchLower)) return false;
            }

            // Date range filter
            if (filters.startDate || filters.endDate) {
                const logDate = new Date(log.timestamp);
                if (filters.startDate && logDate < filters.startDate) return false;
                if (filters.endDate && logDate > filters.endDate) return false;
            }
            return true;
        })
}
searchAndSort(
    filters: SearchFilters,
    sortBy: 'timestamp' | 'level' | 'source' | 'method' = 'timestamp',
    order: 'asc' | 'desc' = 'desc',
): LogEntry[] {
        const filtered = this.filter(this.logs, filters);
        return this.sort(filtered, sortBy, order);
}


}