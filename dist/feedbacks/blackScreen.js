"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBlackScreenFeedback = setupBlackScreenFeedback;
const base_1 = require("@companion-module/base");
const log_1 = require("../log");
/**
 * 黑屏反馈
 */
function setupBlackScreenFeedback(context) {
    const ColorWhite = (0, base_1.combineRgb)(255, 255, 255);
    const ColorRed = (0, base_1.combineRgb)(200, 0, 0);
    const ColorGreen = (0, base_1.combineRgb)(0, 200, 0);
    const feedBack = {
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
            log_1.logger.info('Black screen feedback trigger');
            if (context.state.isBlackScreen) {
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
