// const fs = require('fs');
// const input = fs.readFileSync('./input.txt').toString().split(' ');

const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ');

let nodeId = 0;
let tree = [];

const getNextNumber = () => {
	return parseInt(input.shift());;
}

const makeTree = (parentId) => {
	nodeId++;

	let childCount = getNextNumber();
	let metaCount = getNextNumber();
	const meta = [];

	if (childCount > 0) {
		for (let j = 0; j < childCount; j++) {
			makeTree(nodeId);
		}
	}

	for (let i = 0; i < metaCount; i++) {
		meta.push(getNextNumber());
	}

	tree.push({nodeId, childCount, metaCount, meta, parentId})

};

makeTree(0);

let count = 0;

tree.forEach(ele => {
	ele.meta.forEach(num => {
		count = count + num;
	})
});

console.log(count);

console.log(tree);