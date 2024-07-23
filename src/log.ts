import type { LogLevel } from '@companion-module/base'

type LogFn = (level: LogLevel, message: string) => void

let logFn: LogFn = () => {}

/**
 * 设置日志输出函数
 * @param fn 日志输出函数
 */
export function setupLogger(fn: LogFn): void {
  logFn = fn
}

export const logger = {
  /**
   * 输出信息级别日志
   */
  info(message: string): void {
    logFn('info', message)
  },

  /**
   * 输出警告级别日志
   */
  warn(message: string): void {
    logFn('warn', message)
  },

  /**
   * 输出错误级别日志
   */
  error(message: string): void {
    logFn('error', message)
  },

  /**
   * 输出调试级别日志
   */
  debug(message: string): void {
    logFn('debug', message)
  }
}
