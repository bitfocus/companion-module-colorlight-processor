import type { ConnectionContext } from './types'
import { TCPHelper, InstanceStatus } from '@companion-module/base'
import { logger } from './log'

// tcp heartbeat interval
const TCP_HEARTBEAT_INTERVAL = 1500
// tcp reconnect interval
const TCP_RECONNECT_INTERVAL = 3000

class Connection {
  // connection context
  private context: ConnectionContext
  // socket instance
  private socket: TCPHelper | null = null
  // heartbeat timer
  private heartbeatTimer: NodeJS.Timeout | null = null

  constructor(context: ConnectionContext) {
    this.context = context
  }

  /**
   * open connection
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
   * stop heartbeat
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /**
   * bind socket events
   */
  private bindSockEvents(socket: TCPHelper): void {
    socket.on('status_change', (status) => {
      logger.info(`TCP connection status change, status: ${status}`)

      // start heartbeat when connection is ok
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
   * open tcp connection
   */
  public open(host: string, port: number) {
    // close previous connection
    if (this.socket && (this.socket.isConnected || this.socket.isConnecting)) {
      this.close()
    }

    // create new socket instance
    this.socket = new TCPHelper(host, port, {
      reconnect: true,
      reconnect_interval: TCP_RECONNECT_INTERVAL
    })

    // bind socket events
    this.bindSockEvents(this.socket)

    // update connection status
    this.context.updateStatus(InstanceStatus.Connecting)
  }

  /**
   * close connection
   */
  public close(): void {
    this.stopHeartbeat()
    this.socket?.destroy()
    this.socket = null
  }

  /**
   * send data
   */
  public async send(data: Buffer): Promise<boolean> {
    if (!this.socket?.isConnected) return false

    return this.socket.send(data)
  }
}

export { Connection }
