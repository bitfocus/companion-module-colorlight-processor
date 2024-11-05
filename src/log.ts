import type { LogLevel } from '@companion-module/base'

type LogFn = (level: LogLevel, message: string) => void

let logFn: LogFn = () => {}

/**
 * setup logger
 * @param fn log function
 */
export function setupLogger(fn: LogFn): void {
  logFn = fn
}

export const logger = {
  /**
   * output info log
   */
  info(message: string): void {
    logFn('info', message)
  },

  /**
   * output warning log
   */
  warn(message: string): void {
    logFn('warn', message)
  },

  /**
   * output error log
   */
  error(message: string): void {
    logFn('error', message)
  },

  /**
   * output debug log
   */
  debug(message: string): void {
    logFn('debug', message)
  }
}
