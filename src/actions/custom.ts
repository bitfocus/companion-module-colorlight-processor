import type { CompanionActionDefinition } from '@companion-module/base'
import type { ActionContext } from '../types'
import { logger } from '../log'

type OptionValues = {
  command: string
}

/**
 * 设置自定义命令操作
 */
export function setCustomCommandAction(context: ActionContext) {
  const action: CompanionActionDefinition = {
    name: 'Custom command',
    options: [
      {
        id: 'command',
        label: 'Command',
        type: 'textinput',
        default: '',
        required: true,
        regex: '^([0-9A-Fa-f]{2})+$'
      }
    ],
    callback: (action) => {
      const { command } = action.options as OptionValues

      const regex = /^([0-9A-Fa-f]{2})+$/
      const testResult = regex.test(command)
      if (!testResult) {
        logger.error('Invalid command')
        return
      }

      const sendBuf = Buffer.from(command, 'hex')

      if (sendBuf.byteLength <= 0) return

      context.send(sendBuf)

      logger.info('send custom command')
    }
  }

  return action
}
