const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

// sort the input
input.sort((a, b) => {
	if (parseInt(a.split(',')[0]) < parseInt(b.split(',')[0]))
		return false;
	else if (parseInt(a.split(',')[0]) > parseInt(b.split(',')[0])) {
		return true;
	} else {
		if (parseInt(a.split(',')[1].trim()) < parseInt(a.split(',')[1].trim())) {
			return false;
		} else if (parseInt(a.split(',')[1].trim()) > parseInt(a.split(',')[1].trim())) {
			return true;
		} else {
			return false;
		}
	}
});

inputX = input.map(ele => parseInt(ele.split(',')[0]));
inputY = input.map(ele => parseInt(ele.split(',')[1].trim()));


// get the grid coordinates to plot
gridX = parseInt(input[input.length - 1].split(',')[0]);
gridY = input.reduce((acc, ele) => {
	if (parseInt(ele.split(',')[1].trim()) > acc) {
		return parseInt(ele.split(',')[1].trim());
	}

	return acc;
}, 0);

// console.log(inputX, inputY);

// Create the grid
const grid = [];
for (let i = 0; i <= gridY; i++) {
	const arr = new Array(gridX + 1).fill(0);
	grid.push(arr);
}

const calculateManhattanDist = (x, y) => {
	let leastDist = Math.abs(x - inputX[0]) + Math.abs( y - inputY[0]);
	let pointIndex = 0;
	for (let i = 0; i < input.length; i++) {
		if (Math.abs(x - inputX[i]) + Math.abs(y - inputY[i]) < leastDist) {
			leastDist = Math.abs(x - inputX[i]) + Math.abs(y - inputY[i]);
			pointIndex = i;
		}
	}

	for (let i = 0; i < input.length; i++) {
		if (i != pointIndex && Math.abs(x - inputX[i]) + Math.abs(y - inputY[i]) == leastDist) {
			// console.log(x, y, pointIndex, i);
			pointIndex = '.';
			break;
		}
	}

	return pointIndex;
}

const findBoundedCoordinates = () => {
	const res = [];

	for (let i = 0; i < input.length; i++) {
		const x = inputX[i];
		const y = inputY[i];
		let xLower = false;
		let yLower = false;
		let yUpper = false;
		let xUpper = false;


		if (i != 0 && i != input.length - 1) {
			for (let j = i ; j >= 0; j--) {
				if (inputX[j] < x) {
					xLower = true;
					break;
				}
			}

			for (let j = i ; j >= 0; j--) {
				if (inputY[j] < y) {
					yLower = true;
					break;
				}
			}

			for (let j = i ; j < input.length; j++) {
				if (inputY[j] > y) {
					yUpper = true;
					break;
				}
			}

			for (let j = i ; j < input.length; j++) {
				if (inputX[j] > x) {
					xUpper = true;
					break;
				}
			}

			if (xUpper && xLower && yLower && yUpper) {
				res.push(i);
			}
		}
	}

	return res;
}

// Populate the grid
grid.forEach((arr1, idx) => {
	arr1.forEach((arr2, idy) => {
		const dist = calculateManhattanDist(idy, idx);
		grid[idx][idy] = dist;
	});
});

const boundedCoordinates = findBoundedCoordinates();
const getLargestArea = () => {
	let area = 0;
	boundedCoordinates.forEach((ele) => {
		let count = 0;
		grid.forEach((arr) => {
			arr.forEach((point) => {
				if (point == ele) {
					count++;
				}
			});
		});
		// console.log(count);
		if (count > area) {
			area = count;
		}
	});
	console.log('Largest area is', area);
}

console.log(boundedCoordinates);
getLargestArea();
//there is an issue with the logic to calculate the bounded points.
//4342 is the as answer



// part 2

const calculateSumManhattanDist = (x, y) => {
	let sum = 0;
	for (let i = 0; i < input.length; i++) {
		sum = sum + Math.abs(x - inputX[i]) + Math.abs(y - inputY[i]);
	}

	return sum;
}

let totalArea = 0;
grid.forEach((arr1, idx) => {
	arr1.forEach((arr2, idy) => {
		const dist = calculateSumManhattanDist(idy, idx);
		 if (dist < 10000)
		 	totalArea++;
	});
});
console.log('Total area', totalArea
	//42966 is the answer