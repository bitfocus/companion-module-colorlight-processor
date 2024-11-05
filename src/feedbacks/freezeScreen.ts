import type { CompanionAdvancedFeedbackDefinition } from '@companion-module/base'
import type { FeedbackContext } from '../types'
import { combineRgb } from '@companion-module/base'
import { logger } from '../log'

/**
 * freezeScreen feedback
 */
export function setupFreezeScreenFeedback(context: FeedbackContext): CompanionAdvancedFeedbackDefinition {
  const ColorWhite = combineRgb(255, 255, 255)
  const ColorRed = combineRgb(200, 0, 0)
  const ColorGreen = combineRgb(0, 200, 0)

  const feedBack: CompanionAdvancedFeedbackDefinition = {
    type: 'advanced',
    name: 'Screen Freeze Status',
    description: 'If Freeze status change, change the style of the button',
    options: [
      {
        type: 'colorpicker',
        label: 'Foreground color (Freeze)',
        id: 'fg',
        default: ColorWhite
      },
      {
        type: 'colorpicker',
        label: 'Background color (Freeze)',
        id: 'bg',
        default: ColorRed
      },
      {
        type: 'colorpicker',
        label: 'Foreground color (unFreeze)',
        id: 'fg_',
        default: ColorWhite
      },
      {
        type: 'colorpicker',
        label: 'Background color (unFreeze)',
        id: 'bg_',
        default: ColorGreen
      }
    ],
    callback: (feedback) => {
      logger.info('Freeze screen feedback trigger')

      if (context.state.isFreezeScreen) {
        return {
          bgcolor: feedback.options.bg as number,
          color: feedback.options.fg as number
        }
      } else {
        return {
          bgcolor: feedback.options.bg_ as number,
          color: feedback.options.fg_ as number
        }
      }
    }
  }

  return feedBack
}
