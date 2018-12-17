const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const stepChart = input.reduce((acc, str) => {
	char1 = str[5];
	char2 = str[36];

	if (!acc.hasOwnProperty(char1)) {
		acc[char1] = {
			key: char1,
			prev: [],
			next: [],
			time: char1.charCodeAt(0) - 64 + 60
		};
	}

	if (!acc.hasOwnProperty(char2)) {
		acc[char2] = {
			key: char2,
			prev: [],
			next: [],
			time: char2.charCodeAt(0) - 64 + 60
		};
	}

	acc[char1].next.push(char2);
	acc[char2].prev.push(char1);

	return acc;
}, {});

let time = 0;
const workers = {};
const sequence = [];
const calculateTime = () => {
	const len = Object.keys(workers).length;
	console.log(workers);
	while(Object.keys(workers).length == len) {
		//Substract the time from the workers
		Object.keys(workers).forEach((key) => {
			workers[key].time = workers[key].time - 1;
		});
		// Increment the elapsed time
		time++;

		Object.keys(workers).forEach((key) => {
			if (workers[key].time == 0) {
				console.log('completed - ', key);
				delete workers[key];

				const next = stepChart[key].next;
				next.forEach((c) => {
					stepChart[c].prev.pop();
				});

				delete stepChart[key];
			}
		});

	}

	console.log('in calculateTime', time);
};

while (Object.keys(stepChart).length > 0) {
	const stepChartArr = Object.values(stepChart);
	const curStep = stepChartArr.filter((obj) => obj.prev.length == 0);
	curStep.sort((a, b) => a.key > b.key);
	// Assign to workers

	while (curStep.length > 0 && Object.keys(workers).length < 5) {
		const obj = curStep.shift();
		workers[obj.key] = obj;

		// const next = stepChart[obj.key].next;
		// next.forEach((c) => {
		// 	stepChart[c].prev.pop();
		// });

		// delete stepChart[obj.key];
	}

	calculateTime();
	console.log(time);
}

while (Object.keys(workers).length > 0) {
	calculateTime();
	console.log('in the final while', time);
}



console.log(time);

