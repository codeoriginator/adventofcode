const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const stepChart = input.reduce((acc, str) => {
	char1 = str[5];
	char2 = str[36];

	if (!acc.hasOwnProperty(char1)) {
		acc[char1] = {
			key: char1,
			prev: [],
			next: []
		};
	}

	if (!acc.hasOwnProperty(char2)) {
		acc[char2] = {
			key: char2,
			prev: [],
			next: []
		};
	}

	acc[char1].next.push(char2);
	acc[char2].prev.push(char1);

	return acc;
}, {});

const sequence = [];
while (Object.keys(stepChart).length > 0) {
	const stepChartArr = Object.values(stepChart);
	const curStep = stepChartArr.filter((obj) => obj.prev.length == 0);
	curStep.sort((a, b) => a.key > b.key);
	const obj = curStep.shift();
	sequence.push(obj.key);
	const next = stepChart[obj.key].next;
	next.forEach((c) => {
		stepChart[c].prev.pop();
	});

	delete stepChart[obj.key];
}

console.log(sequence.join(''));


