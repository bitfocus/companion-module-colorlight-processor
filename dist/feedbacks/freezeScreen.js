"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFreezeScreenFeedback = setupFreezeScreenFeedback;
const base_1 = require("@companion-module/base");
const log_1 = require("../log");
/**
 * 黑屏反馈
 */
function setupFreezeScreenFeedback(context) {
    const ColorWhite = (0, base_1.combineRgb)(255, 255, 255);
    const ColorRed = (0, base_1.combineRgb)(200, 0, 0);
    const ColorGreen = (0, base_1.combineRgb)(0, 200, 0);
    const feedBack = {
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
            log_1.logger.info('Freeze screen feedback trigger');
            if (context.state.isFreezeScreen) {
                return {
                    bgcolor: feedback.options.bg,
                    color: feedback.options.fg
                };
            }
            else {
                return {
                    bgcolor: feedback.options.bg_,
                    color: feedback.options.fg_
                };
            }
        }
    };
    return feedBack;
}
