import type { CompanionActionDefinition } from '@companion-module/base'
import type { ActionContext } from '../types'
import { logger } from '../log'

type OptionValues = {
  deviceId: number
  brightness: number
  isSelectAll: boolean
}

/**
 * 初始化亮度操作
 */
export function setupSetBrightnessAction(context: ActionContext) {
  const action: CompanionActionDefinition = {
    name: 'Adjust brightness',
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
        type: 'number',
        label: 'Brightness',
        id: 'brightness',
        tooltip: 'Sets the brightness percent (0-100)',
        min: 0,
        max: 100,
        default: 50,
        step: 1.0,
        required: true,
        range: false
      },
      {
        type: 'checkbox',
        label: 'Send to all devices',
        id: 'isSelectAll',
        default: false
      }
    ],
    callback: async (action) => {
      const { deviceId = 1, brightness = 50, isSelectAll = false } = action.options as OptionValues
      const deviceIndex = deviceId - 1
      let deviceIndexBuf: Buffer = Buffer.from([0xff, 0xff])

      if (deviceIndex >= 0 && !isSelectAll) {
        const buf = Buffer.alloc(2)

        // 小端字节序写入
        buf.writeUInt16LE(deviceIndex & 0xffff, 0)

        deviceIndexBuf = buf
      }

      // 命令参数
      let command: number[] = []

      if (context.config.protocol === 'V-Protocol') {
        const transBrightness = brightness * 100
        let brightnessBuf = Buffer.from([0x10, 0x27])

        if (transBrightness >= 0) {
          const buf = Buffer.alloc(2)

          // 小端字节序写入
          buf.writeUInt16LE(transBrightness & 0xffff, 0)

          brightnessBuf = buf
        }

        command = [
          0x50,
          0x10,
          0x00,
          0x13,
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
          brightnessBuf[0],
          brightnessBuf[1]
        ]
      }

      if (context.config.protocol === 'Z-Protocol') {
        const transBrightness = Math.round(brightness * 100) / 100 // 保留两位小数
        let brightnessBuf = Buffer.from([0x00, 0x00, 0x00, 0x00])

        if (transBrightness >= 0) {
          const buf = Buffer.alloc(4)

          // 小端序写入
          buf.writeFloatLE(transBrightness, 0)

          brightnessBuf = buf
        }

        command = [
          0x21,
          0x00,
          0x14,
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
          brightnessBuf[0],
          brightnessBuf[1],
          brightnessBuf[2],
          brightnessBuf[3]
        ]
      }

      if (command.length === 0) {
        logger.warn(`Unsupported protocol: ${context.config.protocol}`)

        return
      }

      const sendBuf = Buffer.from(command)
      context.send(sendBuf)

      logger.info('set brightness action trigger')
    }
  }

  return action
}
