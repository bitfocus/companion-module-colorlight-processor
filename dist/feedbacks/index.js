"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEEDBACK_ID = void 0;
exports.setupFeedbacks = setupFeedbacks;
const log_1 = require("../log");
const blackScreen_1 = require("./blackScreen");
const freezeScreen_1 = require("./freezeScreen");
/**
 * 操作类型 id 枚举
 */
var FEEDBACK_ID;
(function (FEEDBACK_ID) {
    FEEDBACK_ID["BLACK_SCREEN"] = "blackScreen";
    FEEDBACK_ID["FREEZE_SCREEN"] = "freezeScreen";
    FEEDBACK_ID["TEST_MODE"] = "testMode";
    FEEDBACK_ID["SET_BRIGHTNESS"] = "setBrightness";
    FEEDBACK_ID["SWITCH_PRESET"] = "switchPreset";
})(FEEDBACK_ID || (exports.FEEDBACK_ID = FEEDBACK_ID = {}));
/**
 * 初始化反馈
 */
function setupFeedbacks(context) {
    // 反馈定义对象
    const feedbacks = {
        [FEEDBACK_ID.BLACK_SCREEN]: (0, blackScreen_1.setupBlackScreenFeedback)(context),
        [FEEDBACK_ID.FREEZE_SCREEN]: (0, freezeScreen_1.setupFreezeScreenFeedback)(context)
    };
    log_1.logger.info('Feedbacks setup completed.');
    return feedbacks;
}
