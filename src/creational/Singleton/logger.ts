class Logger {
    private logs: string[] = [];

    constructor() {
        console.log('Logger 初始化了！(只会发生一次)');
    }

    public log(message: string) {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
        console.log(`[Logger]: ${message}`);
    }

    public printLogs() {
        console.log(this.logs);
    }
}

// 直接实例化并导出
export const logger = new Logger();
// 这样在任何地方 import { logger } 都会得到同一个实例
