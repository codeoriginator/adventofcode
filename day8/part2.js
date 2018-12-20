const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split(' ');

// const input = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'.split(' ');

let nodeId = 0;
let tree = [];

const getNextNumber = () => {
	return parseInt(input.shift());;
}

let nodes = [];
let parent = [];

const makeTree = () => {	
	let childCount = getNextNumber();
	let metaCount = getNextNumber();
	const meta = [];
	let parentId;
	let node;

	nodeId++;
	nodes.push(nodeId);

	if (childCount > 0) {
		for (let j = 0; j < childCount; j++) {
			parent.push(nodeId);			
		}
		
		for (let j = 0; j < childCount; j++) {
			makeTree();		
		}
	}

	for (let i = 0; i < metaCount; i++) {
		meta.push(getNextNumber());
	}

	node = nodes.pop();
	parentId = parent.pop();

	tree.push({node, childCount, metaCount, meta, parentId})
};	


makeTree();

let count = 0;

const rootNode = tree.filter(obj => obj.parentId == undefined);
//console.log(rootNode);

const calculateMetaSum = (node) => {
	console.log(node);
	if (node.childCount > 0) {
		const childNodes = tree.filter(obj => obj.parentId == node.node)
		node.meta.forEach(ele => {
			if (childNodes[ele - 1]) {
				calculateMetaSum(childNodes[ele - 1])
			}
		});

	} else {
		count = count + node.meta.reduce((acc, ele) => acc + ele, 0);
	}
}

calculateMetaSum(rootNode[0]);

console.log(count);