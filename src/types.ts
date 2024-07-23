import type { InstanceBase } from '@companion-module/base'
import type { StateCache } from './state'

/**
 * 设备配置
 */
export type DeviceConfig = {
  host: string
  port: number
  protocol: 'Z-Protocol' | 'V-Protocol'
}

/**
 * 连接实例的基础接口
 */
export interface ProcessorBase {
  config: DeviceConfig
  state: StateCache
  send(data: Buffer): Promise<boolean>
}

/**
 * 操作上下文
 */
export type ActionContext = ProcessorBase

/**
 * 反馈上下文
 */
export type FeedbackContext = ProcessorBase

/**
 * 状态上下文
 */
export type StateContext = {
  triggerFeedbacks(...ids: string[]): void
}

/**
 * 连接上下文
 */
export type ConnectionContext = {
  config: DeviceConfig
} & Pick<InstanceBase<DeviceConfig>, 'updateStatus'>
