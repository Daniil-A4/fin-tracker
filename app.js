const chart = document.querySelector('.pie-chart')
const form = document.getElementById('fin-tracker-form')
const recordList = document.getElementById('records')
const clearBtn = document.querySelector('.clearBtn')
const portions = []

form.addEventListener('submit', handleSabmit)
recordList.addEventListener('mouseover', handleRecordHover)
recordList.addEventListener('mouseout', handleRecordMouseLeave)
recordList.addEventListener('click', handleRecordClick)

function handleSabmit() {
	if (portions.length >= 0) {
		clearBtn.style.opacity = '1'
	}
	portions.push({ label: form.label.value, value: form.portion.valueAsNumber })
	showRecords()
	updatePieChart(portions.map(({ value }) => value))
	form.reset()
}

function handleRecordHover(e) {
	if (e.target.matches('li')) {
		const index = Array.prototype.indexOf.call(recordList.children, e.target)
		updatePieChart(portions.map(({ value }) => value), index)
	}
}

function handleRecordMouseLeave(e) {
	if (e.target.matches('li')) {
		updatePieChart(portions.map(({ value }) => value))
	}
}

function handleRecordClick(e) {
	if (e.target.matches('button')) {
		const index = e.target.parentElement.itemIndex
		portions.splice(index, 1)
		updatePieChart(portions.map(({ value }) => value))
		showRecords()
	} 
}

function updatePieChart(portions, index) {
	const total = portions.reduce((sum, num) => sum + num)
	const angles = portions.map(portion => 360 / total * portion)
	let angle = angles[0]
	let bg = ''

	if (index === undefined) {
		bg = `conic-gradient(${genColor(0, true)} `

		for (let i = 1; i < angles.length - 1; i++) {
			bg += `${angle}deg, ${genColor(i, true)} ${angle}deg `
			angle += angles[i]
		}

		bg += `${angle}deg, ${genColor(angles.length - 1, true)} ${angle}deg)`
	}
	else {
		bg = `conic-gradient(${genColor(0, index === 0)} `

		for (let i = 1; i < angles.length - 1; i++) {
			bg += `${angle}deg, ${genColor(i, index === i)} ${angle}deg `
			angle += angles[i]
		}

		bg += `${angle}deg, ${genColor(angles.length - 1, index === angles.length - 1)} ${angle}deg)`
	}

	chart.style.background = bg
}

function genColor(i, opaque) {
	return `hsla(${150 * i}, 70%, 44%, ${opaque ? 1 : 0.5})`
}

function showRecords() {
	let html = ''

	for (let i in portions) {
		const { label, value } = portions[i]
		html += `<li style="--color: ${genColor(i)}">${label}: ${value}<button>&times;</button></li>`
	}

	records.innerHTML = html
}

Object.defineProperty(HTMLLIElement.prototype, 'itemIndex', {
	get() {
		return Array.prototype.indexOf.call(this.parentElement?.children, this)
	}
})



