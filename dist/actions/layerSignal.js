"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupLayerSignalAction = setupLayerSignalAction;
const log_1 = require("../log");
/**
 * V 协议支持设备列表
 */
const V_PROTOCOL_DEVICES = [
    {
        id: 'X8m',
        label: 'X8m'
    },
    {
        id: 'X12m',
        label: 'X12m'
    },
    {
        id: 'X20m',
        label: 'X20m'
    },
    {
        id: 'X26m',
        label: 'X26m'
    },
    {
        id: 'X40m',
        label: 'X40m'
    },
    {
        id: 'D9',
        label: 'D9'
    },
    {
        id: 'D16',
        label: 'D16'
    },
    {
        id: 'V2',
        label: 'V2'
    },
    {
        id: 'V2 Pro',
        label: 'V2 Pro'
    },
    {
        id: 'V3',
        label: 'V3'
    },
    {
        id: 'V3 Pro',
        label: 'V3 Pro'
    },
    {
        id: 'VX10',
        label: 'VX10'
    }
];
/**
 * V 协议支持信号列表
 */
const V_PROTOCOL_SIGNALS = [
    {
        id: '12G-SDI',
        label: '12G-SDI'
    },
    {
        id: '3G-SDI',
        label: '3G-SDI'
    },
    {
        id: 'HDMI2.0',
        label: 'HDMI2.0'
    },
    {
        id: 'DP1.4',
        label: 'DP1.4'
    },
    {
        id: 'DVI-1',
        label: 'DVI-1'
    },
    {
        id: 'DVI-2',
        label: 'DVI-2'
    },
    {
        id: 'HDMI1.4-1',
        label: 'HDMI1.4-1'
    },
    {
        id: 'HDMI1.4-2',
        label: 'HDMI1.4-2'
    },
    {
        id: 'HDMI1.4-3',
        label: 'HDMI1.4-3'
    },
    {
        id: 'HDMI1.4-4',
        label: 'HDMI1.4-4'
    },
    {
        id: 'HDMI1.4-5',
        label: 'HDMI1.4-5'
    },
    {
        id: 'MOSAIC',
        label: 'MOSAIC'
    }
];
/**
 * V 协议设备信号映射表
 */
const V_PROTOCOL_DEVICE_SIGNAL_MAP = {
    X8m: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    X12m: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    X20m: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    },
    X26m: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    },
    X40m: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    },
    D9: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    },
    D16: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    },
    V2: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    'V2 Pro': {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    V3: {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    'V3 Pro': {
        '12G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x22,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        'DP1.4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x21,
            interfaceId: 0x02
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x03
        },
        'HDMI1.4-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x04
        },
        'HDMI1.4-3': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'HDMI1.4-4': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x06
        },
        'HDMI1.4-5': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x07
        }
    },
    VX10: {
        '3G-SDI': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x12,
            interfaceId: 0x00
        },
        'HDMI2.0': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x20,
            interfaceId: 0x01
        },
        MOSAIC: {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x25,
            interfaceId: 0x04
        },
        'HDMI1.4-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x11,
            interfaceId: 0x05
        },
        'DVI-1': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x06
        },
        'DVI-2': {
            boardType: 0x18,
            boardId: 0x10,
            interfaceType: 0x10,
            interfaceId: 0x07
        }
    }
};
/**
 * Z 协议支持设备列表
 */
const Z_PROTOCOL_DEVICES = [
    {
        id: 'Z6',
        label: 'Z6'
    },
    {
        id: 'Other',
        label: 'Other'
    }
];
/**
 * Z 协议支持信号列表
 */
const Z_PROTOCOL_SIGNALS = [
    {
        id: 'HDMI-1',
        label: 'HDMI-1'
    },
    {
        id: 'HDMI-2',
        label: 'HDMI-2'
    },
    {
        id: 'HDMI-3',
        label: 'HDMI-3'
    },
    {
        id: 'HDMI-4',
        label: 'HDMI-4'
    },
    {
        id: 'HDMI-5',
        label: 'HDMI-5'
    },
    {
        id: 'HDMI-6',
        label: 'HDMI-6'
    },
    {
        id: 'HDMI-7',
        label: 'HDMI-7'
    },
    {
        id: 'DP-1',
        label: 'DP-1'
    },
    {
        id: 'DP-2',
        label: 'DP-2'
    },
    {
        id: 'DP-3',
        label: 'DP-3'
    },
    {
        id: 'DP-4',
        label: 'DP-4'
    },
    {
        id: 'DP-5',
        label: 'DP-5'
    },
    {
        id: 'DP-6',
        label: 'DP-6'
    },
    {
        id: 'DP-7',
        label: 'DP-7'
    },
    {
        id: 'DVI-1',
        label: 'DVI-1'
    },
    {
        id: 'DVI-2',
        label: 'DVI-2'
    },
    {
        id: 'DVI-3',
        label: 'DVI-3'
    },
    {
        id: 'DVI-4',
        label: 'DVI-4'
    },
    {
        id: 'DVI-5',
        label: 'DVI-5'
    },
    {
        id: 'DVI-6',
        label: 'DVI-6'
    },
    {
        id: 'DVI-7',
        label: 'DVI-7'
    },
    {
        id: 'DVI-8',
        label: 'DVI-8'
    },
    {
        id: 'DVI-9',
        label: 'DVI-9'
    },
    {
        id: 'DVI-10',
        label: 'DVI-10'
    },
    {
        id: 'DVI-11',
        label: 'DVI-11'
    },
    {
        id: 'DVI-12',
        label: 'DVI-12'
    },
    {
        id: 'DVI-13',
        label: 'DVI-13'
    },
    {
        id: 'DVI-14',
        label: 'DVI-14'
    },
    {
        id: 'DVI-15',
        label: 'DVI-15'
    },
    {
        id: 'DVI-16',
        label: 'DVI-16'
    },
    {
        id: 'SDI-1',
        label: 'SDI-1'
    },
    {
        id: 'SDI-2',
        label: 'SDI-2'
    },
    {
        id: 'SDI-3',
        label: 'SDI-3'
    },
    {
        id: 'SDI-4',
        label: 'SDI-4'
    },
    {
        id: 'SDI-5',
        label: 'SDI-5'
    },
    {
        id: 'SDI-6',
        label: 'SDI-6'
    },
    {
        id: 'SDI-7',
        label: 'SDI-7'
    },
    {
        id: 'SDI-8',
        label: 'SDI-8'
    },
    {
        id: 'SDI-9',
        label: 'SDI-9'
    },
    {
        id: 'SDI-10',
        label: 'SDI-10'
    },
    {
        id: 'SDI-11',
        label: 'SDI-11'
    },
    {
        id: 'SDI-12',
        label: 'SDI-12'
    },
    {
        id: 'SDI-13',
        label: 'SDI-13'
    },
    {
        id: 'SDI-14',
        label: 'SDI-14'
    },
    {
        id: 'SDI-15',
        label: 'SDI-15'
    },
    {
        id: 'SDI-16',
        label: 'SDI-16'
    },
    {
        id: 'VGA',
        label: 'VGA'
    },
    {
        id: 'AV-1',
        label: 'AV-1'
    },
    {
        id: 'AV-2',
        label: 'AV-2'
    }
];
/**
 * Z 协议设备信号映射表
 */
const Z_PROTOCOL_DEVICE_SIGNAL_MAP = {
    Z6: {
        'HDMI-1': 0x10,
        'DVI-1': 0x50,
        'SDI-1': 0x20,
        'SDI-2': 0x21
    },
    Other: {
        'HDMI-1': 0x10,
        'HDMI-2': 0x11,
        'HDMI-3': 0x12,
        'HDMI-4': 0x13,
        'HDMI-5': 0x14,
        'HDMI-6': 0x15,
        'HDMI-7': 0x16,
        'DP-1': 0x30,
        'DP-2': 0x31,
        'DP-3': 0x32,
        'DP-4': 0x33,
        'DP-5': 0x34,
        'DP-6': 0x35,
        'DP-7': 0x36,
        'DVI-1': 0x01,
        'DVI-2': 0x02,
        'DVI-3': 0x03,
        'DVI-4': 0x04,
        'DVI-5': 0x05,
        'DVI-6': 0x06,
        'DVI-7': 0x07,
        'DVI-8': 0x08,
        'DVI-9': 0x09,
        'DVI-10': 0x0a,
        'DVI-11': 0x0b,
        'DVI-12': 0x0c,
        'DVI-13': 0x90,
        'DVI-14': 0x91,
        'DVI-15': 0x92,
        'DVI-16': 0x93,
        'SDI-1': 0x20,
        'SDI-2': 0x21,
        'SDI-3': 0x22,
        'SDI-4': 0x23,
        'SDI-5': 0x24,
        'SDI-6': 0x25,
        'SDI-7': 0x26,
        'SDI-8': 0x27,
        'SDI-9': 0x28,
        'SDI-10': 0x29,
        'SDI-11': 0x2a,
        'SDI-12': 0x2b,
        'SDI-13': 0x2c,
        'SDI-14': 0x2d,
        'SDI-15': 0x2e,
        'SDI-16': 0x2f,
        VGA: 0x40,
        'AV-1': 0x41,
        'AV-2': 0x42
    }
};
function setupLayerSignalAction(context) {
    // V 协议预置动作
    const vProtocolAction = {
        name: `Layer's Signal`,
        options: [
            {
                id: 'deviceId',
                label: 'Device ID',
                type: 'number',
                default: 1,
                required: true,
                min: 1,
                max: 64,
                isVisible: (action) => !action.isSelectAll
            },
            {
                id: 'deviceType',
                label: 'Device type',
                type: 'dropdown',
                default: V_PROTOCOL_DEVICES[0].id,
                choices: V_PROTOCOL_DEVICES
            },
            {
                id: 'interfaceName',
                label: 'Signal',
                type: 'dropdown',
                default: V_PROTOCOL_SIGNALS[0].id,
                choices: V_PROTOCOL_SIGNALS
            },
            {
                type: 'checkbox',
                label: 'Send to all devices',
                id: 'isSelectAll',
                default: false
            }
        ],
        callback: (action) => {
            const { deviceId = 1, isSelectAll = false, deviceType = '', interfaceName = '' } = action.options;
            const deviceIndex = deviceId - 1;
            let deviceIndexBuf = Buffer.from([0xff, 0xff]);
            if (deviceIndex >= 0 && !isSelectAll) {
                const buf = Buffer.alloc(2);
                // 小端字节序写入
                buf.writeUInt16LE(deviceIndex & 0xffff, 0);
                deviceIndexBuf = buf;
            }
            const deviceInfo = V_PROTOCOL_DEVICE_SIGNAL_MAP[deviceType];
            if (!deviceInfo)
                return;
            const interfaceMark = deviceInfo[interfaceName];
            if (!interfaceMark)
                return;
            log_1.logger.info(`change layer's signal action trigger, interfaceMark: ${JSON.stringify(interfaceMark)}`);
            // 板卡 id 为两个字节
            const boardIdBuf = Buffer.alloc(2);
            // 小端字节序写入
            boardIdBuf.writeUInt16LE(interfaceMark.boardId & 0xffff, 0);
            // 命令参数
            const actionCommand = [
                0x20,
                0x10,
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
                0x00,
                boardIdBuf[0],
                boardIdBuf[1],
                interfaceMark.boardType,
                0x00,
                interfaceMark.interfaceType,
                interfaceMark.interfaceId
            ];
            const actionSendBuf = Buffer.from(actionCommand);
            context.send(actionSendBuf);
            // 生效命令
            const efficientCommand = [0x52, 0x00, 0x10, 0x00, 0x00, 0x00, deviceIndexBuf[0], deviceIndexBuf[1], 0x00];
            const efficientSendBuf = Buffer.from(efficientCommand);
            context.send(efficientSendBuf);
            // 保存命令
            const saveCommand = [0x50, 0x00, 0x10, 0x00, 0x00, 0x00, deviceIndexBuf[0], deviceIndexBuf[1], 0x00];
            const saveSendBuf = Buffer.from(saveCommand);
            context.send(saveSendBuf);
        }
    };
    // Z 协议预置动作
    const zProtocolAction = {
        name: `Layer's Signal`,
        options: [
            {
                id: 'deviceId',
                label: 'Device ID',
                type: 'number',
                default: 1,
                required: true,
                min: 1,
                max: 64,
                isVisible: (action) => !action.isSelectAll
            },
            {
                id: 'deviceType',
                label: 'Device type',
                type: 'dropdown',
                default: Z_PROTOCOL_DEVICES[1].id, // 默认选择 Other
                choices: Z_PROTOCOL_DEVICES,
                isVisible: () => false // 暂时屏蔽掉
            },
            {
                id: 'interfaceName',
                label: 'Signal',
                type: 'dropdown',
                default: Z_PROTOCOL_SIGNALS[0].id,
                choices: Z_PROTOCOL_SIGNALS
            },
            {
                type: 'checkbox',
                label: 'Send to all devices',
                id: 'isSelectAll',
                default: false
            }
        ],
        callback: (action) => {
            const { deviceId = 1, isSelectAll = false, deviceType = '', interfaceName = '' } = action.options;
            const deviceIndex = deviceId - 1;
            let deviceIndexBuf = Buffer.from([0xff, 0xff]);
            if (deviceIndex >= 0 && !isSelectAll) {
                const buf = Buffer.alloc(2);
                // 小端字节序写入
                buf.writeUInt16LE(deviceIndex & 0xffff, 0);
                deviceIndexBuf = buf;
            }
            const deviceInfo = Z_PROTOCOL_DEVICE_SIGNAL_MAP[deviceType];
            if (!deviceInfo)
                return;
            const interfaceId = deviceInfo[interfaceName];
            if (interfaceId === undefined)
                return;
            log_1.logger.info(`change layer's signal action trigger, interfaceId: ${interfaceId}`);
            // 操作命令参数
            const actionCommand = [
                0x33,
                0x00,
                0x12,
                0x00,
                0x00,
                0x00,
                deviceIndexBuf[0],
                deviceIndexBuf[1],
                0xff,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                interfaceId
            ];
            const actionSendBuf = Buffer.from(actionCommand);
            context.send(actionSendBuf);
            // 生效命令
            const efficientCommand = [
                0x6f,
                0x00,
                0x10,
                0x00,
                0x00,
                0x00,
                deviceIndexBuf[0],
                deviceIndexBuf[1],
                0xff,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00
            ];
            const efficientSendBuf = Buffer.from(efficientCommand);
            context.send(efficientSendBuf);
            // 保存命令
            const saveCommand = [
                0x10,
                0x00,
                0x11,
                0x00,
                0x00,
                0x00,
                deviceIndexBuf[0],
                deviceIndexBuf[1],
                0xff,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x00,
                0x01
            ];
            const saveSendBuf = Buffer.from(saveCommand);
            context.send(saveSendBuf);
        }
    };
    return context.config.protocol === 'V-Protocol' ? vProtocolAction : zProtocolAction;
}
