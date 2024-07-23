"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateCache = void 0;
const feedbacks_1 = require("../feedbacks");
const log_1 = require("../log");
/**
 * 状态缓存
 */
class StateCache {
    context;
    blackScreen;
    freezeScreen;
    constructor(context) {
        this.context = context;
        this.blackScreen = false;
        this.freezeScreen = false;
    }
    get isBlackScreen() {
        return this.blackScreen;
    }
    set isBlackScreen(value) {
        this.blackScreen = value;
        log_1.logger.info(`Black screen state changed: ${value}`);
        // 触发黑屏反馈
        this.context.triggerFeedbacks(feedbacks_1.FEEDBACK_ID.BLACK_SCREEN);
    }
    get isFreezeScreen() {
        return this.freezeScreen;
    }
    set isFreezeScreen(value) {
        this.freezeScreen = value;
        log_1.logger.info(`Freeze screen state changed: ${value}`);
        // 触发冻结反馈
        this.context.triggerFeedbacks(feedbacks_1.FEEDBACK_ID.FREEZE_SCREEN);
    }
}
exports.StateCache = StateCache;
