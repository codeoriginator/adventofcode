const players = 452;
const topMarble = 7125000;
const circle = [0];
const score = new Array(players + 1).fill(0);
let  current = 0;
let currentPlayer = 0;

for (let i = 1; i <= topMarble; i++) {
	if (i % 10000 == 0) {
		console.log(i);
	}

	if (currentPlayer == players) {
		currentPlayer = 1;
	} else {
		currentPlayer++;
	}

	if (i % 23 == 0) {
		score[currentPlayer] += i;

		if (current - 7 >= 0) {
			current = current - 7;
			score[currentPlayer] += circle[current];
			circle.splice(current, 1);
			
		} else {
			//console.log(current, circle);
			current = circle.length - (7 - (current));
			score[currentPlayer] += circle[current];
			circle.splice(current, 1);
			//console.log(current, circle);
			//break;
		}
	} else {
		if (i == 1) {
			current++;
			circle.splice(current, 0, i);
		} else {
			let index = current + 2;

			if (index > circle.length) {
				index = index % circle.length;
			}
			circle.splice(index, 0, i);
			current = index;
		}
	}
}

const highest = score.reduce((acc, ele) => acc > ele ? acc: ele , 0);
// console.log(score);
// console.log(circle);
 console.log(highest);