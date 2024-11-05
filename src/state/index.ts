import type { StateContext } from '../types'
import { FEEDBACK_ID } from '../feedbacks'
import { logger } from '../log'

/**
 * state cache
 */
class StateCache {
  private context: StateContext
  public blackScreen: boolean
  public freezeScreen: boolean

  constructor(context: StateContext) {
    this.context = context

    this.blackScreen = false
    this.freezeScreen = false
  }

  get isBlackScreen(): boolean {
    return this.blackScreen
  }

  set isBlackScreen(value: boolean) {
    this.blackScreen = value

    logger.info(`Black screen state changed: ${value}`)

    // trigger black screen feedback
    this.context.triggerFeedbacks(FEEDBACK_ID.BLACK_SCREEN)
  }

  get isFreezeScreen(): boolean {
    return this.freezeScreen
  }

  set isFreezeScreen(value: boolean) {
    this.freezeScreen = value

    logger.info(`Freeze screen state changed: ${value}`)

    // 触发冻结反馈
    this.context.triggerFeedbacks(FEEDBACK_ID.FREEZE_SCREEN)
  }
}

export { StateCache }
