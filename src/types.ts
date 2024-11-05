import type { InstanceBase } from '@companion-module/base'
import type { StateCache } from './state'

/**
 * device config
 */
export type DeviceConfig = {
  host: string
  port: number
  protocol: 'Z-Protocol' | 'V-Protocol'
}

/**
 * base processor
 */
export interface ProcessorBase {
  config: DeviceConfig
  state: StateCache
  send(data: Buffer): Promise<boolean>
}

/**
 * action context
 */
export type ActionContext = ProcessorBase

/**
 * feedback context
 */
export type FeedbackContext = ProcessorBase

/**
 * state context
 */
export type StateContext = {
  triggerFeedbacks(...ids: string[]): void
}

/**
 * connection context
 */
export type ConnectionContext = {
  config: DeviceConfig
} & Pick<InstanceBase<DeviceConfig>, 'updateStatus'>
