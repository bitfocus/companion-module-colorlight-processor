"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const base_1 = require("@companion-module/base");
const log_1 = require("./log");
// tcp 心跳间隔
const TCP_HEARTBEAT_INTERVAL = 1500;
// tcp 重连间隔
const TCP_RECONNECT_INTERVAL = 3000;
class Connection {
    // 上下文对象
    context;
    // socket 连接实例
    socket = null;
    // 心跳定时器
    heartbeatTimer = null;
    constructor(context) {
        this.context = context;
    }
    /**
     * 启动 tcp 心跳
     */
    startHeartbeat() {
        if (!this.context.config)
            return;
        const Z_PROTOCOL_HEARTBEAT = Buffer.from([0x99, 0x99, 0x04, 0x00]);
        const V_PROTOCOL_HEARTBEAT = Buffer.from([0x99, 0x99, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00]);
        let message = V_PROTOCOL_HEARTBEAT;
        if (this.context.config.protocol === 'Z-Protocol') {
            message = Z_PROTOCOL_HEARTBEAT;
        }
        this.heartbeatTimer = setInterval(() => {
            if (!this.socket?.isConnected)
                return;
            log_1.logger.info('Send heartbeat.');
            this.socket.send(message);
        }, TCP_HEARTBEAT_INTERVAL);
    }
    /**
     * 停止 tcp 心跳
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    /**
     * 绑定 tcp 连接事件
     */
    bindSockEvents(socket) {
        socket.on('status_change', (status) => {
            log_1.logger.info(`TCP connection status change, status: ${status}`);
            // 连接成功开启心跳
            if (status === base_1.InstanceStatus.Ok) {
                this.startHeartbeat();
            }
            this.context.updateStatus(status);
        });
        socket.on('data', (buf) => {
            log_1.logger.info(`TCP receive buffer, length: ${buf.length}`);
        });
        socket.on('error', (err) => {
            log_1.logger.error(`TCP connection error: ${err.message}`);
        });
    }
    /**
     * 初始化和开启连接实例
     */
    open(host, port) {
        // 关闭旧的 tcp 连接
        if (this.socket && (this.socket.isConnected || this.socket.isConnecting)) {
            this.close();
        }
        // 建立新的 tcp 连接
        this.socket = new base_1.TCPHelper(host, port, {
            reconnect: true,
            reconnect_interval: TCP_RECONNECT_INTERVAL
        });
        // 绑定事件
        this.bindSockEvents(this.socket);
        // 更新连接中状态
        this.context.updateStatus(base_1.InstanceStatus.Connecting);
    }
    /**
     * 关闭 tcp 连接
     */
    close() {
        this.stopHeartbeat();
        this.socket?.destroy();
        this.socket = null;
    }
    /**
     * 发送数据
     */
    async send(data) {
        if (!this.socket?.isConnected)
            return false;
        return this.socket.send(data);
    }
}
exports.Connection = Connection;
