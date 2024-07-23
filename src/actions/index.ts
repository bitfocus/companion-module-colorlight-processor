import type { CompanionActionDefinitions } from '@companion-module/base'
import type { ActionContext } from '../types'
import { logger } from '../log'
import { setupBlackScreenAction } from './blackScreen'
import { setupFreezeScreenAction } from './freezeScreen'
import { setupTestModeAction } from './testMode'
import { setupSetBrightnessAction } from './brightness'
import { setupSwitchPresetAction } from './preset'
import { setCustomCommandAction } from './custom'
import { setupLayerSignalAction } from './layerSignal'

/**
 * 操作类型 id 枚举
 */
export enum ACTION_ID {
  BLACK_SCREEN = 'black_screen',
  FREEZE_SCREEN = 'freeze_screen',
  TEST_MODE = 'test_mode',
  SET_BRIGHTNESS = 'set_brightness',
  SWITCH_PRESET = 'switch_preset',
  CUSTOM_COMMAND = 'custom_command',
  LAYER_SIGNAL = 'layer_signal'
}

/**
 * 初始化操作
 */
export function setupActions(context: ActionContext): CompanionActionDefinitions {
  // 操作定义对象
  const actions: CompanionActionDefinitions = {
    [ACTION_ID.BLACK_SCREEN]: setupBlackScreenAction(context),
    [ACTION_ID.FREEZE_SCREEN]: setupFreezeScreenAction(context),
    [ACTION_ID.TEST_MODE]: setupTestModeAction(context),
    [ACTION_ID.SET_BRIGHTNESS]: setupSetBrightnessAction(context),
    [ACTION_ID.SWITCH_PRESET]: setupSwitchPresetAction(context),
    [ACTION_ID.CUSTOM_COMMAND]: setCustomCommandAction(context),
    [ACTION_ID.LAYER_SIGNAL]: setupLayerSignalAction(context)
  }

  logger.info('Actions setup completed.')

  return actions
}
