import type { CompanionAdvancedFeedbackDefinition } from '@companion-module/base'
import type { FeedbackContext } from '../types'
import { combineRgb } from '@companion-module/base'
import { logger } from '../log'

/**
 * blackScreen feedback
 */
export function setupBlackScreenFeedback(context: FeedbackContext): CompanionAdvancedFeedbackDefinition {
  const ColorWhite = combineRgb(255, 255, 255)
  const ColorRed = combineRgb(200, 0, 0)
  const ColorGreen = combineRgb(0, 200, 0)

  const feedBack: CompanionAdvancedFeedbackDefinition = {
    type: 'advanced',
    name: 'Screen Black Status',
    description: 'If Black status change, change the style of the button',
    options: [
      {
        type: 'colorpicker',
        label: 'Foreground color (Black)',
        id: 'fg',
        default: ColorWhite
      },
      {
        type: 'colorpicker',
        label: 'Background color (Black)',
        id: 'bg',
        default: ColorRed
      },
      {
        type: 'colorpicker',
        label: 'Foreground color (unBlack)',
        id: 'fg_',
        default: ColorWhite
      },
      {
        type: 'colorpicker',
        label: 'Background color (unBlack)',
        id: 'bg_',
        default: ColorGreen
      }
    ],
    callback: (feedback) => {
      logger.info('Black screen feedback trigger')

      if (context.state.isBlackScreen) {
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
