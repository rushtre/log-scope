
import {logEntry} from "@/components/LogEntry";


class LogSearchEngine {

    private byLevel = new Map <string, logEntry[]>();
    private bySource = new Map <string, logEntry[]>();
    private byTimestamp = new Map <string, logEntry[]>();
    private byMessage = new Map <string, logEntry[]>();

    constructor(logs: logEntry[]) {
        this.buildIndexes(logs)
    }

    // Index data by their attributes
    private buildIndexes(logs: logEntry[]) {
            for (const log of logs) {
                this.addToIndex(this.byLevel, log.level, log);
                this.addToIndex(this.bySource, log.source, log);
                this.addToIndex(this.byTimestamp, log.timestamp, log);
                this.addToIndex(this.byMessage, log.message, log);
            }
    }

    // Function to help insert a log to its respective group
    private addToIndex<K>(map: Map<K, logEntry[]>, key: K, log: logEntry) {
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