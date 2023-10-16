const { InstanceBase, InstanceStatus, Regex, TCPHelper, runEntrypoint } = require('@companion-module/base')
const actionFunc = require('./action')


class CLTInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.setActionDefinitions(actionFunc.getActionDefinitions(this))

		await this.configUpdated(config)
	}
	// When module gets deleted
	async destroy() {
		if (this.SERIAL_INTERVAL) {
			clearInterval(this.SERIAL_INTERVAL)
		}
		if (this.socket) {
			this.socket.destroy()
		} else {
			this.updateStatus(InstanceStatus.Disconnected)
		}
	}

	async configUpdated(config) {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.config = config

		this.init_tcp()

		this.init_tcp_variables()
	}

	init_tcp() {
		if (this.socket) {
			this.socket.destroy()
			delete this.socket
		}

		this.updateStatus(InstanceStatus.Connecting)

		if (this.config.host) {
			this.socket = new TCPHelper(this.config.host, this.config.port)

			var cmd = [
				'0x99',
				'0x99',
				'0x08',
				'0x00',
				'0x00',
				'0x00',
				'0x00',
				'0x00'
			]

			if (this.config.deviceType == 'Z-Protocol') {
				cmd = []
				cmd = [
					'0x99',
					'0x99',
					'0x04',
					'0x00'
				]
			}

			var sendBuf = Buffer.from(cmd)

			if (this.SERIAL_INTERVAL) {
				clearInterval(this.SERIAL_INTERVAL)
			}
	
			this.SERIAL_INTERVAL = setInterval(() => {
				if (this.socket !== undefined && this.socket.isConnected) {
					this.log('info', 'HeartBeat')
					this.socket.send(sendBuf)
				}
	
			}, 1000)

			this.socket.on('status_change', (status, message) => {
				this.updateStatus(status, message)
			})

			this.socket.on('error', (err) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
				if (this.SERIAL_INTERVAL) {
					clearInterval(this.SERIAL_INTERVAL)
				}
				this.log('error', 'Network error: ' + err.message)
			})

			this.socket.on('data', (data) => {
				if (this.config.saveresponse) {
					let dataResponse = data

					if (this.config.convertresponse == 'string') {
						dataResponse = data.toString()
					} else if (this.config.convertresponse == 'hex') {
						dataResponse = data.toString('hex')
					}

					this.setVariableValues({ tcp_response: dataResponse })
				}
			})
		} else {
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	init_tcp_variables() {
		this.setVariableDefinitions([{ name: 'Last TCP Response', variableId: 'tcp_response' }])

		this.setVariableValues({ tcp_response: '' })
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'dropdown',
				id: 'deviceType',
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
				default: 'V-Protocol',
			},
		]
	}

}

runEntrypoint(CLTInstance, [])
