import type { CompanionActionDefinition } from '@companion-module/base'
import type { ActionContext } from '../types'
import { logger } from '../log'

type OptionValues = {
  deviceId: number
  openStatus: number
  isSelectAll: boolean
}

/**
 * 初始化冻结屏幕操作
 */
export function setupFreezeScreenAction(context: ActionContext) {
  const action: CompanionActionDefinition = {
    name: 'Open/Close freeze screen',
    options: [
      {
        type: 'number',
        label: 'Device ID',
        id: 'deviceId',
        min: 1,
        max: 64,
        default: 1,
        required: true,
        isVisible: (action) => !action.isSelectAll
      },
      {
        type: 'dropdown',
        label: 'Open/Close',
        id: 'openStatus',
        tooltip: 'Open/Close freeze screen',
        default: 1,
        choices: [
          {
            id: 1,
            label: 'Open'
          },
          {
            id: 0,
            label: 'Close'
          }
        ]
      },
      {
        type: 'checkbox',
        label: 'Send to all devices',
        id: 'isSelectAll',
        default: false
      }
    ],
    callback: async (action) => {
      const { deviceId = 1, openStatus = 1, isSelectAll = false } = action.options as OptionValues
      const deviceIndex = deviceId - 1
      let deviceIndexBuf: Buffer = Buffer.from([0xff, 0xff])

      if (deviceIndex >= 0 && !isSelectAll) {
        const buf = Buffer.alloc(2)

        // 小端字节序写入
        buf.writeUInt16LE(deviceIndex & 0xffff, 0)

        deviceIndexBuf = buf
      }

      let command: number[] = []

      if (context.config.protocol === 'V-Protocol') {
        command = [
          0x11,
          0x10,
          0x00,
          0x12,
          0x00,
          0x00,
          0x00,
          deviceIndexBuf[0],
          deviceIndexBuf[1],
          0x02,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          openStatus
        ]
      }

      if (context.config.protocol === 'Z-Protocol') {
        command = [
          0x12,
          0x00,
          0x11,
          0x00,
          0x00,
          0x00,
          deviceIndexBuf[0],
          deviceIndexBuf[1],
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          0x00,
          openStatus
        ]
      }

      if (command.length === 0) {
        logger.warn(`Unsupported protocol: ${context.config.protocol}`)

        return
      }

      const sendBuf = Buffer.from(command)
      context.send(sendBuf)

      logger.info('freeze screen action trigger')
    }
  }

  return action
}
