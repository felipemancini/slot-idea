const slotLength = 15
const maxRow = 3

const symbols = ['9','10', 'J', 'Q', 'K', 'A', 'cat', 'dog', 'monkey', 'bird']

const slotData = (list, num) => {
	const result = []
	for (let i = 0; i < num; i++) {
		result.push(getRandomInList(symbols))
	}
	return result
}

const getRandomInList = list => parseInt(Math.random() * list.length, 10)
const getSlotState = () => getRandomInList(symbols)
const randomizeSlots = () => 0.5 - Math.random()
const sortSlot = slots => slots.sort(randomizeSlots)

const getGrid = (data, limit) => data.reduce((prev, current, index) => {
	if (index % limit === 0) {
		prev.push([current])
	} else {
		prev[prev.length - 1].push(current)
	}

	return prev
}, [])

const checkLine = (line, slotGrid) => slotGrid[line]
		.reduce((prev, current, index, arr) => index === 0 ? prev : prev && arr[index] === arr[index - 1], true)

const checkRow = (row, slotGrid) => slotGrid
	.reduce((prev, current, index) => index < 1 ? prev : prev && slotGrid[index][row] === slotGrid[index - 1][row], true)

const getResults = (symbols, slotLength, maxRow) => getGrid(slotData(symbols, slotLength), maxRow)

const result = getResults(symbols, slotLength, maxRow)

// Hack test
result[0] = [1, 1, 1]
result[1][0] = 1
result[2][0] = 1
result[3][0] = 1
result[4][0] = 1

const payload = {result, lineMatch: checkLine(0, result), rowMatch: checkRow(0, result)}

console.log(payload)
