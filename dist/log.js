"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.setupLogger = setupLogger;
let logFn = () => { };
/**
 * 设置日志输出函数
 * @param fn 日志输出函数
 */
function setupLogger(fn) {
    logFn = fn;
}
exports.logger = {
    /**
     * 输出信息级别日志
     */
    info(message) {
        logFn('info', message);
    },
    /**
     * 输出警告级别日志
     */
    warn(message) {
        logFn('warn', message);
    },
    /**
     * 输出错误级别日志
     */
    error(message) {
        logFn('error', message);
    },
    /**
     * 输出调试级别日志
     */
    debug(message) {
        logFn('debug', message);
    }
};
