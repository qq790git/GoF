import { logger } from './logger';

export const print = function () {
    logger.log('模块 B 的消息');
    logger.printLogs(); // 会打印出模块 A 和 B 的两条消息
};
