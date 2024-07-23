import type { SomeCompanionConfigField } from '@companion-module/base'
import type { ProcessorBase, DeviceConfig } from './types'
import { InstanceBase, runEntrypoint } from '@companion-module/base'
import { defaultConfig, generateConfigFields } from './config'
import { Connection } from './connection'
import { StateCache } from './state'
import { setupLogger, logger } from './log'
import { setupActions } from './actions'
import { setupFeedbacks } from './feedbacks'

class CltProcessor extends InstanceBase<DeviceConfig> implements ProcessorBase {
  // 配置对象
  public config: DeviceConfig
  // 连接
  public connection: Connection
  // 状态缓存
  public state: StateCache

  constructor(internal: unknown) {
    super(internal)

    this.config = defaultConfig

    this.connection = new Connection(this)

    const stateContext = {
      triggerFeedbacks: this.checkFeedbacks.bind(this)
    }
    this.state = new StateCache(stateContext)

    // 初始化日志工具
    setupLogger(this.log.bind(this))
  }

  /**
   * 初始化和开启实例
   */
  public async init(config: DeviceConfig, isFirstInit: boolean): Promise<void> {
    logger.info('Init connection instance.')

    if (isFirstInit) {
      this.config = config
    } else {
      logger.info('Manually update config after init.')

      this.configUpdated(config)
    }
  }

  /**
   * 销毁或关闭实例
   */
  public async destroy(): Promise<void> {
    this.connection.close()

    logger.info('Destroy connection instance.')
  }

  /**
   * 初始化操作
   */
  private initActions(): void {
    logger.info('Init actions.')

    this.setActionDefinitions(setupActions(this))
  }

  /**
   * 初始化反馈
   */
  private initFeedbacks(): void {
    logger.info('Init feedbacks.')

    this.setFeedbackDefinitions(setupFeedbacks(this))
  }

  /**
   * 实例配置更新
   */
  public async configUpdated(config: DeviceConfig): Promise<void> {
    this.config = config

    logger.info('Config updated.')

    // 简单校验 host 配置项即可
    if (this.config.host) {
      this.connection.open(this.config.host, this.config.port)
    } else {
      logger.error('Host config is empty.')
    }

    this.initActions()
    false && this.initFeedbacks() // 暂时关闭反馈
  }

  /**
   * 设置配置项
   */
  public getConfigFields(): SomeCompanionConfigField[] {
    return generateConfigFields()
  }

  /**
   * 触发反馈
   */
  public triggerFeedback(id: string): void {
    this.checkFeedbacksById(id)
  }

  /**
   * 发送数据
   */
  public async send(data: Buffer): Promise<boolean> {
    return this.connection.send(data)
  }
}

runEntrypoint(CltProcessor, [])
