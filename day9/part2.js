const players = 452;
const topMarble = 7125000;
const circle = [0];
const score = new Array(players + 1).fill(0);
let  current;
let currentPlayer = 0;

const createNode = (value, prev, next) => { 
	return {value, prev, next }
};

let shift1;
let shift2;
let node = createNode(0, null, null);
node.next = node;
node.prev = node;

for (let i = 1; i <= topMarble; i++) {
	if (currentPlayer == players) {
		currentPlayer = 1;
	} else {
		currentPlayer++;
	}

	if (i % 23 == 0) {
		score[currentPlayer] += i;

		for (let j = 0; j < 7; j++) {
			current = current.prev;
		}

		score[currentPlayer] += current.value;
		let prevNode = current.prev;
		let nextNode = current.next;
		prevNode.next = nextNode;
		nextNode.prev = prevNode;
		current = nextNode;

	} else {
		if (i == 1) {
			current = createNode(i, node, node);
			node.next = current;
			node.prev = current;
		} else {
			shift1 = current.next;
			shift2 = shift1.next;

			current = createNode(i, shift1, shift2);
			shift1.next = current;
			shift2.prev = current;

		}
	}
}

const highest = score.reduce((acc, ele) => acc > ele ? acc: ele , 0);
// console.log(score);
 console.log(current);
 console.log(highest);