import type { CompanionFeedbackDefinitions } from '@companion-module/base'
import type { FeedbackContext } from '../types'
import { logger } from '../log'
import { setupBlackScreenFeedback } from './blackScreen'
import { setupFreezeScreenFeedback } from './freezeScreen'

/**
 * 操作类型 id 枚举
 */
export enum FEEDBACK_ID {
  BLACK_SCREEN = 'blackScreen',
  FREEZE_SCREEN = 'freezeScreen',
  TEST_MODE = 'testMode',
  SET_BRIGHTNESS = 'setBrightness',
  SWITCH_PRESET = 'switchPreset'
}

/**
 * 初始化反馈
 */
export function setupFeedbacks(context: FeedbackContext): CompanionFeedbackDefinitions {
  // 反馈定义对象
  const feedbacks: CompanionFeedbackDefinitions = {
    [FEEDBACK_ID.BLACK_SCREEN]: setupBlackScreenFeedback(context),
    [FEEDBACK_ID.FREEZE_SCREEN]: setupFreezeScreenFeedback(context)
  }

  logger.info('Feedbacks setup completed.')

  return feedbacks
}
