import type { CompanionFeedbackDefinitions } from '@companion-module/base'
import type { FeedbackContext } from '../types'
import { logger } from '../log'
import { setupBlackScreenFeedback } from './blackScreen'
import { setupFreezeScreenFeedback } from './freezeScreen'

/**
 * feedbacks ID
 */
export enum FEEDBACK_ID {
  BLACK_SCREEN = 'blackScreen',
  FREEZE_SCREEN = 'freezeScreen',
  TEST_MODE = 'testMode',
  SET_BRIGHTNESS = 'setBrightness',
  SWITCH_PRESET = 'switchPreset'
}

/**
 * init feedbacks
 */
export function setupFeedbacks(context: FeedbackContext): CompanionFeedbackDefinitions {
  // all feedbacks
  const feedbacks: CompanionFeedbackDefinitions = {
    [FEEDBACK_ID.BLACK_SCREEN]: setupBlackScreenFeedback(context),
    [FEEDBACK_ID.FREEZE_SCREEN]: setupFreezeScreenFeedback(context)
  }

  logger.info('Feedbacks setup completed.')

  return feedbacks
}
