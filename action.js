const testMode = [
    {
        id: '0x00',
        label: 'Nomal'
    },
    {
        id: '0x01',
        label: 'Red'
    },
    {
        id: '0x02',
        label: 'Green'
    },
    {
        id: '0x03',
        label: 'Blue'
    },
    {
        id: '0x04',
        label: 'White'
    },
    {
        id: '0x05',
        label: 'Horizontal Moving Line'
    },
    {
        id: '0x06',
        label: 'Vertical Moving Line'
    },
    {
        id: '0x07',
        label: 'Left Slash Move Down'
    },
    {
        id: '0x08',
        label: 'Right Slash Move Down'
    },
    {
        id: '0x09',
        label: 'Grid Move Down'
    },
    {
        id: '0x0a',
        label: 'Gradient Red'
    },
    {
        id: '0x0b',
        label: 'Gradient Green'
    },
    {
        id: '0x0c',
        label: 'Gradient Blue'
    },
    {
        id: '0x0d',
        label: 'Gradient White'
    },
    {
        id: '0x0e',
        label: 'Black'
    }
]

var getActionDefinitions = function (self) {
	return {
		black_screen: {
			name: 'Open/Close black screen',
			options: [
				{
					type: 'number',
					label: 'Device ID',
					id: 'deviceid',
					min: 1,
					max: 64,
					default: 1,
					required: true, 
					isVisible: (action) => !action.issel,
				},
				{
					type: 'dropdown',
					label: 'Open/Close',
					id: 'switchvalue',
					tooltip: 'Open/Close black screen',
					default: 1,
					required: true,
					choices: [
						{
							id: 1,
							label: 'Open',
						},
						{
							id: 0,
							label: 'Close',
						},
					],
				},
				{
					type: 'checkbox',
					label: 'Send to all devices',
					id: 'issel',
					default: false,
				},
			],
			callback: async (action) => {
				var deviceId = parseInt(action.options.deviceid) - 1
				var switchValue = '0x0' + action.options.switchvalue
				var isSelAll = action.options.issel
				var deviceIdArr = ['0xff', '0xff']

				if (deviceId >= 0 && !isSelAll) {
					let deviceIdStr = deviceId.toString(16)

					if (deviceIdStr.length == 1) {
						deviceIdStr = '000' + deviceIdStr
					} else if (deviceIdStr.length == 2) {
						deviceIdStr = '00' + deviceIdStr
					} else if (deviceIdStr.length == 3) {
						deviceIdStr = '0' + deviceIdStr
					} else if (deviceIdStr.length == 4) {
						deviceIdStr = '' + deviceIdStr
					}
					deviceIdArr = ['0x' + deviceIdStr.slice(2, 4), '0x' + deviceIdStr.slice(0, 2)]
				}

				var cmd = [
					'0x10',
					'0x10',
					'0x00',
					'0x12',
					'0x00',
					'0x00',
					'0x00',
					deviceIdArr[0],
					deviceIdArr[1],
					'0x02',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					switchValue,
				]

				if (self.config.deviceType == 'Z-Protocol') {
					switchValue = '0x0' + (action.options.switchvalue == 0 ? 1 : 0)
					cmd = []
					cmd = [
						'0x11',
						'0x00',
						'0x11',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						switchValue,
					]
				}

				console.log(cmd)
				var sendBuf = Buffer.from(cmd)

				if (sendBuf) {
					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					}
				}
			},
		},
        freeze_screen: {
			name: 'Open/Close freeze screen',
			options: [
				{
					type: 'number',
					label: 'Device ID',
					id: 'deviceid',
					min: 1,
					max: 64,
					default: 1,
					required: true,
					isVisible: (action) => !action.issel,
				},
				{
					type: 'dropdown',
					label: 'Open/Close',
					id: 'switchvalue',
					tooltip: 'Open/Close freeze screen',
					default: 1,
					required: true,
					choices: [
						{
							id: 1,
							label: 'Open',
						},
						{
							id: 0,
							label: 'Close',
						},
					],
				},
				{
					type: 'checkbox',
					label: 'Send to all devices',
					id: 'issel',
					default: false,
				},
			],
			callback: async (action) => {
				var deviceId = parseInt(action.options.deviceid) - 1
				var switchValue = '0x0' + action.options.switchvalue
				var isSelAll = action.options.issel
				var deviceIdArr = ['0xff', '0xff']

				if (deviceId >= 0 && !isSelAll) {
					let deviceIdStr = deviceId.toString(16)

					if (deviceIdStr.length == 1) {
						deviceIdStr = '000' + deviceIdStr
					} else if (deviceIdStr.length == 2) {
						deviceIdStr = '00' + deviceIdStr
					} else if (deviceIdStr.length == 3) {
						deviceIdStr = '0' + deviceIdStr
					} else if (deviceIdStr.length == 4) {
						deviceIdStr = '' + deviceIdStr
					}
					deviceIdArr = ['0x' + deviceIdStr.slice(2, 4), '0x' + deviceIdStr.slice(0, 2)]
				}

				var cmd = [
					'0x11',
					'0x10',
					'0x00',
					'0x12',
					'0x00',
					'0x00',
					'0x00',
					deviceIdArr[0],
					deviceIdArr[1],
					'0x02',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					switchValue,
				]

				if (self.config.deviceType == 'Z-Protocol') {
					cmd = []
					cmd = [
						'0x12',
						'0x00',
						'0x11',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						switchValue,
					]
				}

				console.log(cmd)
				var sendBuf = Buffer.from(cmd)

				if (sendBuf) {
					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					}
				}
			},
		},
        test_mode: {
			name: 'Switch test mode',
			options: [
				{
					type: 'number',
					label: 'Device ID',
					id: 'deviceid',
					min: 1,
					max: 64,
					default: 1,
					required: true,
					isVisible: (action) => !action.issel,
				},
				{
					type: 'dropdown',
					label: 'Switch test mode',
					id: 'switchvalue',
					default: '0x00',
					required: true,
					choices: testMode
				},
				{
					type: 'checkbox',
					label: 'Send to all devices',
					id: 'issel',
					default: false,
				},
			],
			callback: async (action) => {
				var deviceId = parseInt(action.options.deviceid) - 1
				var switchValue = action.options.switchvalue
				var isSelAll = action.options.issel
				var deviceIdArr = ['0xff', '0xff']

				if (deviceId >= 0 && !isSelAll) {
					let deviceIdStr = deviceId.toString(16)

					if (deviceIdStr.length == 1) {
						deviceIdStr = '000' + deviceIdStr
					} else if (deviceIdStr.length == 2) {
						deviceIdStr = '00' + deviceIdStr
					} else if (deviceIdStr.length == 3) {
						deviceIdStr = '0' + deviceIdStr
					} else if (deviceIdStr.length == 4) {
						deviceIdStr = '' + deviceIdStr
					}
					deviceIdArr = ['0x' + deviceIdStr.slice(2, 4), '0x' + deviceIdStr.slice(0, 2)]
				}

				var cmd = [
					'0x12',
					'0x10',
					'0x00',
					'0x12',
					'0x00',
					'0x00',
					'0x00',
					deviceIdArr[0],
					deviceIdArr[1],
					'0x02',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					switchValue,
				]

				if (self.config.deviceType == 'Z-Protocol') {
					cmd = []
					cmd = [
						'0x32',
						'0x00',
						'0x18',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						switchValue,
						'0xff',
						'0x00',
						'0xff',
						'0x00',
						'0xff',
						'0x00',
						'0x00'
					]
				}

				console.log(cmd)
				var sendBuf = Buffer.from(cmd)

				if (sendBuf) {
					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					}
				}
			},
		},
        send_brightness: {
			name: 'Adjust brightness',
			options: [
				{
					type: 'number',
					label: 'Device ID',
					id: 'deviceid',
					min: 1,
					max: 64,
					default: 1,
					required: true,
					isVisible: (action) => !action.issel,
				},
				{
					type: 'number',
					label: 'Brightness',
					id: 'brightness',
					tooltip: 'Sets the brightness percent (0-100)',
					min: 0,
					max: 100,
					default: 50,
					step: 1.0,
					required: true,
					range: false,
				},
                {
					type: 'checkbox',
					label: 'Send to all devices',
					id: 'issel',
					default: false,
				},
			],
			callback: async (action) => {
				var cmd = []
				var deviceId = parseInt(action.options.deviceid) - 1
                var isSelAll = action.options.issel

                var deviceIdArr = ['0xff', '0xff']

                if (deviceId >= 0 && !isSelAll) {
					let deviceIdStr = deviceId.toString(16)

					if (deviceIdStr.length == 1) {
						deviceIdStr = '000' + deviceIdStr
					} else if (deviceIdStr.length == 2) {
						deviceIdStr = '00' + deviceIdStr
					} else if (deviceIdStr.length == 3) {
						deviceIdStr = '0' + deviceIdStr
					} else if (deviceIdStr.length == 4) {
						deviceIdStr = '' + deviceIdStr
					}
					deviceIdArr = ['0x' + deviceIdStr.slice(2, 4), '0x' + deviceIdStr.slice(0, 2)]
                }

				if (self.config.deviceType == 'V-Protocol') {
					var brightness = parseInt(action.options.brightness) * 100
					var brightnessArr = ['0x10', '0x27']
	
					if (brightness >= 0) {
						brightness = brightness.toString(16)
	
						let brightnessStr = ''
						if (brightness.length == 1) {
							brightnessStr = '000' + brightness
						} else if (brightness.length == 2) {
							brightnessStr = '00' + brightness
						} else if (brightness.length == 3) {
							brightnessStr = '0' + brightness
						} else if (brightness.length == 4) {
							brightnessStr = '' + brightness
						}
						brightnessArr = ['0x' + brightnessStr.slice(2, 4), '0x' + brightnessStr.slice(0, 2)]
					}
	
					cmd = [
						'0x50',
						'0x10',
						'0x00',
						'0x13',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x02',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						brightnessArr[0],
						brightnessArr[1],
					]
				} else if (self.config.deviceType == 'Z-Protocol') {
					var brightness = (parseInt(action.options.brightness) / 100).toFixed(2)
					var brightnessArr = ['0x00', '0x00', '0x00', '0x00']
	
					if (brightness > 0) {
						var view = new DataView(new ArrayBuffer(4))
						view.setFloat32(0, brightness)
	
						let brightnessStr = '' + view.getInt32(0).toString(16)

						if (brightnessStr && brightnessStr.length && brightnessStr.length == 8) {
							brightnessArr = ['0x' + brightnessStr.slice(6, 8), '0x' + brightnessStr.slice(4, 6), '0x' + brightnessStr.slice(2, 4), '0x' + brightnessStr.slice(0, 2)]
						}
					}
					cmd = [
						'0x21',
						'0x00',
						'0x14',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						brightnessArr[0],
						brightnessArr[1],
						brightnessArr[2],
						brightnessArr[3]
					]
				}

				console.log(cmd)
				var sendBuf = Buffer.from(cmd)

				if (sendBuf) {
					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					}
				}
			},
		},
		switch_preset: {
			name: 'Switch preset',
			options: [
				{
					type: 'number',
					label: 'Device ID',
					id: 'deviceid',
					min: 1,
					max: 64,
					default: 1,
					required: true,
					isVisible: (action) => !action.issel,
				},
				{
					type: 'number',
					label: 'preset',
					id: 'preset',
					tooltip: 'Switch preset',
					min: 1,
					max: 16,
					default: 1,
					step: 1.0,
					required: true,
					range: false,
				},
                {
					type: 'checkbox',
					label: 'Send to all devices',
					id: 'issel',
					default: false,
				},
			],
			callback: async (action) => {
				var cmd = []
				var deviceId = parseInt(action.options.deviceid) - 1
                var isSelAll = action.options.issel

                var deviceIdArr = ['0xff', '0xff']

                if (deviceId >= 0 && !isSelAll) {
					let deviceIdStr = deviceId.toString(16)

					if (deviceIdStr.length == 1) {
						deviceIdStr = '000' + deviceIdStr
					} else if (deviceIdStr.length == 2) {
						deviceIdStr = '00' + deviceIdStr
					} else if (deviceIdStr.length == 3) {
						deviceIdStr = '0' + deviceIdStr
					} else if (deviceIdStr.length == 4) {
						deviceIdStr = '' + deviceIdStr
					}
					deviceIdArr = ['0x' + deviceIdStr.slice(2, 4), '0x' + deviceIdStr.slice(0, 2)]
                }

				var preset = parseInt(action.options.preset) - 1
				let presetStr = '0x00'

				if (preset >= 0) {
					preset = preset.toString(16)
					if (preset.length == 1) {
						presetStr = '0x0' + preset
					} else if (preset.length == 2) {
						presetStr = '0x' + preset
					}
				}

				cmd = [
					'0x07',
					'0x10',
					'0x03',
					'0x13',
					'0x00',
					'0x00',
					'0x00',
					deviceIdArr[0],
					deviceIdArr[1],
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					'0x00',
					presetStr,
					'0x00'
				]

				if (self.config.deviceType == 'Z-Protocol') {
					cmd = []
					cmd = [
						'0x74',
						'0x00',
						'0x11',
						'0x00',
						'0x00',
						'0x00',
						deviceIdArr[0],
						deviceIdArr[1],
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						'0x00',
						presetStr
					]
				}

				console.log(cmd)
				var sendBuf = Buffer.from(cmd)

				if (sendBuf) {
					if (self.socket !== undefined && self.socket.isConnected) {
						self.socket.send(sendBuf)
					}
				}
			},
		}
	}
}

exports.getActionDefinitions = getActionDefinitions
