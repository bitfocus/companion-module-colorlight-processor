"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCustomCommandAction = setCustomCommandAction;
const log_1 = require("../log");
/**
 * 设置自定义命令操作
 */
function setCustomCommandAction(context) {
    const action = {
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
            const { command } = action.options;
            const regex = /^([0-9A-Fa-f]{2})+$/;
            const testResult = regex.test(command);
            if (!testResult) {
                log_1.logger.error('Invalid command');
                return;
            }
            const sendBuf = Buffer.from(command, 'hex');
            if (sendBuf.byteLength <= 0)
                return;
            context.send(sendBuf);
            log_1.logger.info('send custom command');
        }
    };
    return action;
}
