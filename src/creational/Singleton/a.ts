import { logger } from './logger';

export const print = function () {
    logger.log('模块 A 的消息');
    logger.printLogs();
};
