
import {LogEntry} from "@/services/types";


class LogSearchEngine {

    private byLevel = new Map <string, LogEntry[]>();
    private bySource = new Map <string, LogEntry[]>();
    private byTimestamp = new Map <string, LogEntry[]>();
    private byMessage = new Map <string, LogEntry[]>();

    constructor(logs: LogEntry[]) {
        this.buildIndexes(logs)
    }

    // Index data by their attributes
    private buildIndexes(logs: LogEntry[]) {
            for (const log of logs) {
                this.addToIndex(this.byLevel, log.level, log);
                this.addToIndex(this.bySource, log.source, log);
                this.addToIndex(this.byTimestamp, log.timestamp, log);
                this.addToIndex(this.byMessage, log.message, log);
            }
    }

    // Function to help insert a log to its respective group
    private addToIndex<K>(map: Map<K, LogEntry[]>, key: K, log: LogEntry) {
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(log);
    }

    getErrorLogs() {
        return this.byLevel.get('ERROR') ?? [];
    }

    getLogsBySource(source: string) {
        return this.bySource.get(source) ?? [];
    }

    getLogsByTimestamp(timestamp: string) {
        return this.byTimestamp.get(timestamp) ?? [];
    }

    getLogsByMessage(message: string) {
        return this.byMessage.get(message) ?? [];
    }

}