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
  // device config
  public config: DeviceConfig
  // connection instance
  public connection: Connection
  // state cache
  public state: StateCache

  constructor(internal: unknown) {
    super(internal)

    this.config = defaultConfig

    this.connection = new Connection(this)

    const stateContext = {
      triggerFeedbacks: this.checkFeedbacks.bind(this)
    }
    this.state = new StateCache(stateContext)

    // init logger
    setupLogger(this.log.bind(this))
  }

  /**
   * init connection instance
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
   * destroy connection instance
   */
  public async destroy(): Promise<void> {
    this.connection.close()

    logger.info('Destroy connection instance.')
  }

  /**
   * init actions
   */
  private initActions(): void {
    logger.info('Init actions.')

    this.setActionDefinitions(setupActions(this))
  }

  /**
   * init feedbacks
   */
  private initFeedbacks(): void {
    logger.info('Init feedbacks.')

    this.setFeedbackDefinitions(setupFeedbacks(this))
  }

  /**
   * config updated
   */
  public async configUpdated(config: DeviceConfig): Promise<void> {
    this.config = config

    logger.info('Config updated.')

    if (this.config.host) {
      this.connection.open(this.config.host, this.config.port)
    } else {
      logger.error('Host config is empty.')
    }

    this.initActions()
    false && this.initFeedbacks() // TODO: enable feedbacks
  }

  /**
   * get config fields
   */
  public getConfigFields(): SomeCompanionConfigField[] {
    return generateConfigFields()
  }

  /**
   * trigger feedbacks by id
   */
  public triggerFeedback(id: string): void {
    this.checkFeedbacksById(id)
  }

  /**
   * send data
   */
  public async send(data: Buffer): Promise<boolean> {
    return this.connection.send(data)
  }
}

runEntrypoint(CltProcessor, [])
