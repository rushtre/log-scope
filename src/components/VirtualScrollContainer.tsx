import React, {useState, useMemo, useCallback}  from "react";
import {SortConfig, VirtualScrollContainer} from "@/services/types";
import LogEntry from "@/components/LogEntry";
import SearchBar from "@/components/SearchBar";

export default function VirtualScrollContainer({
    logs,
    itemHeight,
    containerHeight,
    sortConfig,
    onSortChange,
    searchFilters,
    onSearchUpdate,
    overscan = 3
}: VirtualScrollContainer) {

    const [scrollTop, setScrollTop] = useState(0);

    const visibleRange = useMemo(() => {
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
            startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
            logs.length
        );
        return {
            start: Math.max(0, startIndex - overscan),
            end: endIndex
        };
    }, [scrollTop, itemHeight, containerHeight, logs.length, overscan])

    const visibleItems = useMemo(() => {
        return logs.slice(visibleRange.start, visibleRange.end);
    }, [logs, visibleRange]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
    }, [])

    const handleColumnSort = (column: SortConfig['sortBy']) => {
        onSortChange(column);
    };

    const totalHeight = logs.length * itemHeight
    const offsetY = visibleRange.start * itemHeight

return (
    <div className={"logs-container" }>
        <div className="logs-hero">
            <text>Total Logs: {logs.length}</text>
            <SearchBar
                searchFilters={searchFilters}
                onSearchUpdate={onSearchUpdate}
            />
        </div>
            <div className="logs-title-container">
                <span
                    className={`logs-title sortable ${sortConfig.sortBy === 'timestamp' ? 'active' : ''}`}
                    onClick={() => handleColumnSort('timestamp')}
                >
                    Timestamp {sortConfig.sortBy === 'timestamp' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </span>
                <span
                    className={`logs-title sortable ${sortConfig.sortBy === 'level' ? 'active' : ''}`}
                    onClick={() => handleColumnSort('level')}
                >
                    Level {sortConfig.sortBy === 'level' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </span>
                <span
                    className={`logs-title sortable ${sortConfig.sortBy === 'source' ? 'active' : ''}`}
                    onClick={() => handleColumnSort('source')}
                >
                    Source {sortConfig.sortBy === 'source' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </span>
                <span
                    className={`logs-title sortable ${sortConfig.sortBy === 'method' ? 'active' : ''}`}
                    onClick={() => handleColumnSort('method')}
                >
                    Method {sortConfig.sortBy === 'method' && (sortConfig.order === 'asc' ? '↑' : '↓')}
                </span>

                <span className="logs-title">Message</span>
            </div>
        <div className={"virtual-scroll-viewport"}
             style={{
                 height: containerHeight,
                 overflowY: "auto"
            }}
             onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{
                transform: `translateY(${offsetY})px`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
            }}>
                {visibleItems.map((log, index) => {
                    const actualIndex = visibleRange.start + index;
                    return (
                        <div
                            key={log.id}
                            style={{ height: itemHeight }}
                            className={`virtual-scroll-item ${actualIndex % 2 === 1 ? 'odd' : 'even'}`}
                        >
                            <LogEntry {...log} />
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    </div>
)


}

