"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_ID = void 0;
exports.setupActions = setupActions;
const log_1 = require("../log");
const blackScreen_1 = require("./blackScreen");
const freezeScreen_1 = require("./freezeScreen");
const testMode_1 = require("./testMode");
const brightness_1 = require("./brightness");
const preset_1 = require("./preset");
const custom_1 = require("./custom");
const layerSignal_1 = require("./layerSignal");
/**
 * 操作类型 id 枚举
 */
var ACTION_ID;
(function (ACTION_ID) {
    ACTION_ID["BLACK_SCREEN"] = "black_screen";
    ACTION_ID["FREEZE_SCREEN"] = "freeze_screen";
    ACTION_ID["TEST_MODE"] = "test_mode";
    ACTION_ID["SET_BRIGHTNESS"] = "set_brightness";
    ACTION_ID["SWITCH_PRESET"] = "switch_preset";
    ACTION_ID["CUSTOM_COMMAND"] = "custom_command";
    ACTION_ID["LAYER_SIGNAL"] = "layer_signal";
})(ACTION_ID || (exports.ACTION_ID = ACTION_ID = {}));
/**
 * 初始化操作
 */
function setupActions(context) {
    // 操作定义对象
    const actions = {
        [ACTION_ID.BLACK_SCREEN]: (0, blackScreen_1.setupBlackScreenAction)(context),
        [ACTION_ID.FREEZE_SCREEN]: (0, freezeScreen_1.setupFreezeScreenAction)(context),
        [ACTION_ID.TEST_MODE]: (0, testMode_1.setupTestModeAction)(context),
        [ACTION_ID.SET_BRIGHTNESS]: (0, brightness_1.setupSetBrightnessAction)(context),
        [ACTION_ID.SWITCH_PRESET]: (0, preset_1.setupSwitchPresetAction)(context),
        [ACTION_ID.CUSTOM_COMMAND]: (0, custom_1.setCustomCommandAction)(context),
        [ACTION_ID.LAYER_SIGNAL]: (0, layerSignal_1.setupLayerSignalAction)(context)
    };
    log_1.logger.info('Actions setup completed.');
    return actions;
}
