"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTestModeAction = setupTestModeAction;
const log_1 = require("../log");
/**
 * 预置测试模式选项
 */
const TEST_MODES_CHOICES = [
    {
        id: 0x00,
        label: 'Normal'
    },
    {
        id: 0x01,
        label: 'Red'
    },
    {
        id: 0x02,
        label: 'Green'
    },
    {
        id: 0x03,
        label: 'Blue'
    },
    {
        id: 0x04,
        label: 'White'
    },
    {
        id: 0x05,
        label: 'Horizontal Moving Line'
    },
    {
        id: 0x06,
        label: 'Vertical Moving Line'
    },
    {
        id: 0x07,
        label: 'Left Slash Move Down'
    },
    {
        id: 0x08,
        label: 'Right Slash Move Down'
    },
    {
        id: 0x09,
        label: 'Grid Move Down'
    },
    {
        id: 0x0a,
        label: 'Gradient Red'
    },
    {
        id: 0x0b,
        label: 'Gradient Green'
    },
    {
        id: 0x0c,
        label: 'Gradient Blue'
    },
    {
        id: 0x0d,
        label: 'Gradient White'
    },
    {
        id: 0x0e,
        label: 'Black'
    }
];
/**
 * 初始化测试模式操作
 */
function setupTestModeAction(context) {
    const action = {
        name: 'Switch test mode',
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
                type: 'dropdown',
                label: 'Switch test mode',
                id: 'modeValue',
                default: 0x00,
                choices: TEST_MODES_CHOICES
            },
            {
                type: 'checkbox',
                label: 'Send to all devices',
                id: 'isSelectAll',
                default: false
            }
        ],
        callback: (action) => {
            const { deviceId = 1, modeValue = 0, isSelectAll = false } = action.options;
            const deviceIndex = deviceId - 1;
            let deviceIndexBuf = Buffer.from([0xff, 0xff]);
            if (deviceIndex >= 0 && !isSelectAll) {
                const buf = Buffer.alloc(2);
                // 小端字节序写入
                buf.writeUInt16LE(deviceIndex & 0xffff, 0);
                deviceIndexBuf = buf;
            }
            let command = [];
            if (context.config.protocol === 'V-Protocol') {
                command = [
                    0x12,
                    0x10,
                    0x00,
                    0x12,
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
                    modeValue
                ];
            }
            if (context.config.protocol === 'Z-Protocol') {
                command = [
                    0x32,
                    0x00,
                    0x18,
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
                    modeValue,
                    0xff,
                    0x00,
                    0xff,
                    0x00,
                    0xff,
                    0x00,
                    0x00
                ];
            }
            if (command.length === 0) {
                log_1.logger.warn(`Unsupported protocol: ${context.config.protocol}`);
                return;
            }
            const sendBuf = Buffer.from(command);
            context.send(sendBuf);
            log_1.logger.info('test mode action trigger');
        }
    };
    return action;
}
