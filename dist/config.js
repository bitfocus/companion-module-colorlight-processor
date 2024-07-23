"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.generateConfigFields = generateConfigFields;
const base_1 = require("@companion-module/base");
/**
 * 默认配置项
 */
exports.defaultConfig = {
    host: '192.168.1.10',
    port: 9999,
    protocol: 'V-Protocol'
};
/**
 * 生成连接实例配置项的字段和约束
 */
function generateConfigFields() {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            width: 8,
            regex: base_1.Regex.IP
        },
        {
            type: 'textinput',
            id: 'port',
            label: 'Target Port',
            width: 4,
            regex: base_1.Regex.PORT
        },
        {
            type: 'dropdown',
            id: 'protocol',
            label: 'Device Type',
            width: 6,
            choices: [
                {
                    id: 'V-Protocol',
                    label: 'V-Protocol Device'
                },
                {
                    id: 'Z-Protocol',
                    label: 'Z-Protocol Device'
                }
            ],
            default: 'V-Protocol'
        }
    ];
}
