import {spawn} from 'node:child_process'
import path from 'node:path'
import UpdateManager from 'stdout-update'
import colors from 'kleur'

const stdoutMgr = UpdateManager.getInstance()

const bullet = (x) => colors.bold().white(x)
const dim = (x) => colors.dim().white(x)

const keysToRead = [
	{
		key: 'SOC MTR Temp Sensor0 (°C)',
		kind: 0,
	},
	{
		key: 'SOC MTR Temp Sensor1 (°C)',
		kind: 1,
	},
]

const main = () => {
	stdoutMgr.hook()
	stdoutMgr.update(['', '    Getting Thermals...'])
	readThermals()
}

async function readThermals() {
	const executablePath = import.meta.url.replace('file:', '')
	const cmd = `${path.join(executablePath, '..', 'lib', 'sensors', 'sensors')}`
	const stream = spawn(cmd)
	let headers = []

	stream.stdout.on('data', function (data) {
		const dataRows = data.toString().split('\n')
		let readable = []

		// ignore the first set of output since it's part of the header
		if (headers.length === 0) {
			headers = dataRows[0].split(',').map((x) => normalizeName(x))
			readable = dataRows.slice(1).map((x) => x.split(',').filter((x) => x))
			readable = readable[readable.length - 1]
		} else {
			readable = dataRows.map((x) => x.split(',').filter((x) => x))
			readable = readable[readable.length - 1]
		}

		const outline = ['']
		for (const keyData of keysToRead) {
			const keyIndex = headers.indexOf(keyData.key)
			const temperature = Number.parseFloat(readable[keyIndex] || 0)
			let temperatureDisplay = bullet(temperature.toFixed(2))

			// Left at 50 since the macbook starts
			// getting warmer around this temperature
			if (temperature > 50) {
				temperatureDisplay = colors.bold().red(temperature.toFixed(2))
			}

			outline.push(
				dim(`    ${keyData.key} : `) + `${temperatureDisplay} ${dim('°C')}`,
				''
			)
		}

		stdoutMgr.update(outline)
	})

	stream.stderr.on('data', function (data) {
		console.error('[sxtemp]: ' + data.toString())
	})

	stream.on('exit', function (code) {
		console.log('sxtemp closed with ' + code.toString())
	})
}

function normalizeName(key) {
	return key.trim()
}

main()
