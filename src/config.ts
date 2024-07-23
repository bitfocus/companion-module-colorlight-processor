import type { SomeCompanionConfigField } from '@companion-module/base'
import type { DeviceConfig } from './types'
import { Regex } from '@companion-module/base'

/**
 * 默认配置项
 */
export const defaultConfig: DeviceConfig = {
  host: '192.168.1.10',
  port: 9999,
  protocol: 'V-Protocol'
}

/**
 * 生成连接实例配置项的字段和约束
 */
export function generateConfigFields(): SomeCompanionConfigField[] {
  return [
    {
      type: 'textinput',
      id: 'host',
      label: 'Target IP',
      width: 8,
      regex: Regex.IP
    },
    {
      type: 'textinput',
      id: 'port',
      label: 'Target Port',
      width: 4,
      regex: Regex.PORT
    },
    {
      type: 'dropdown',
      id: 'protocol',
      label: 'Device Type',
      width: 6,
      choices: [
        {
          id: 'V-Protocol',
          label: 'V-Protocol Device'
        },
        {
          id: 'Z-Protocol',
          label: 'Z-Protocol Device'
        }
      ],
      default: 'V-Protocol'
    }
  ]
}
