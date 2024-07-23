import type { ConnectionContext } from './types'
import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { logger } from './log'

// tcp 心跳间隔
const TCP_HEARTBEAT_INTERVAL = 1500
// tcp 重连间隔
const TCP_RECONNECT_INTERVAL = 3000

class Connection {
  // 上下文对象
  private context: ConnectionContext
  // socket 连接实例
  private socket: TCPHelper | null = null
  // 心跳定时器
  private heartbeatTimer: NodeJS.Timeout | null = null

  constructor(context: ConnectionContext) {
    this.context = context
  }

  /**
   * 启动 tcp 心跳
   */
  private startHeartbeat(): void {
    if (!this.context.config) return

    const Z_PROTOCOL_HEARTBEAT = Buffer.from([0x99, 0x99, 0x04, 0x00])
    const V_PROTOCOL_HEARTBEAT = Buffer.from([0x99, 0x99, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00])

    let message: Buffer = V_PROTOCOL_HEARTBEAT

    if (this.context.config.protocol === 'Z-Protocol') {
      message = Z_PROTOCOL_HEARTBEAT
    }

    this.heartbeatTimer = setInterval(() => {
      if (!this.socket?.isConnected) return

      logger.info('Send heartbeat.')

      this.socket.send(message)
    }, TCP_HEARTBEAT_INTERVAL)
  }

  /**
   * 停止 tcp 心跳
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /**
   * 绑定 tcp 连接事件
   */
  private bindSockEvents(socket: TCPHelper): void {
    socket.on('status_change', (status) => {
      logger.info(`TCP connection status change, status: ${status}`)

      // 连接成功开启心跳
      if (status === InstanceStatus.Ok) {
        this.startHeartbeat()
      }

      this.context.updateStatus(status)
    })

    socket.on('data', (buf) => {
      logger.info(`TCP receive buffer, length: ${buf.length}`)
    })

    socket.on('error', (err) => {
      logger.error(`TCP connection error: ${err.message}`)
    })
  }

  /**
   * 初始化和开启连接实例
   */
  public open(host: string, port: number) {
    // 关闭旧的 tcp 连接
    if (this.socket && (this.socket.isConnected || this.socket.isConnecting)) {
      this.close()
    }

    // 建立新的 tcp 连接
    this.socket = new TCPHelper(host, port, {
      reconnect: true,
      reconnect_interval: TCP_RECONNECT_INTERVAL
    })

    // 绑定事件
    this.bindSockEvents(this.socket)

    // 更新连接中状态
    this.context.updateStatus(InstanceStatus.Connecting)
  }

  /**
   * 关闭 tcp 连接
   */
  public close(): void {
    this.stopHeartbeat()
    this.socket?.destroy()
    this.socket = null
  }

  /**
   * 发送数据
   */
  public async send(data: Buffer): Promise<boolean> {
    if (!this.socket?.isConnected) return false

    return this.socket.send(data)
  }
}

export { Connection }
