"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwitchPresetAction = setupSwitchPresetAction;
const log_1 = require("../log");
/**
 * 初始化黑屏操作
 */
function setupSwitchPresetAction(context) {
    const action = {
        name: 'Switch preset',
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
                label: 'preset',
                id: 'presetId',
                tooltip: 'Switch preset',
                min: 1,
                max: 16,
                default: 1,
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
        callback: (action) => {
            const { deviceId = 1, presetId = 1, isSelectAll = false } = action.options;
            const deviceIndex = deviceId - 1;
            let deviceIndexBuf = Buffer.from([0xff, 0xff]);
            const presetIndex = presetId - 1;
            let presetIndexBuf = Buffer.from([0x00]);
            if (deviceIndex >= 0 && !isSelectAll) {
                const buf = Buffer.alloc(2);
                // 小端字节序写入
                buf.writeUInt16LE(deviceIndex & 0xffff, 0);
                deviceIndexBuf = buf;
            }
            if (presetIndex >= 0) {
                const buf = Buffer.alloc(1);
                buf.writeUInt8(presetIndex & 0xff, 0);
                presetIndexBuf = buf;
            }
            // 命令参数
            let command = [];
            if (context.config.protocol === 'V-Protocol') {
                command = [
                    0x07,
                    0x10,
                    0x03,
                    0x13,
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
                    presetIndexBuf[0],
                    0x00
                ];
            }
            if (context.config.protocol === 'Z-Protocol') {
                command = [
                    0x74,
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
                    presetIndexBuf[0]
                ];
            }
            if (command.length === 0) {
                log_1.logger.warn(`Unsupported protocol: ${context.config.protocol}`);
                return;
            }
            const sendBuf = Buffer.from(command);
            context.send(sendBuf);
            log_1.logger.info('switch preset action trigger');
        }
    };
    return action;
}
