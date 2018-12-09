/*--- Day 3: No Matter How You Slice It ---
The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

The number of inches between the left edge of the fabric and the left edge of the rectangle.
The number of inches between the top edge of the fabric and the top edge of the rectangle.
The height of the rectangle in inches.
The height of the rectangle in inches.
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........
The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.`
.111133.
........
The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?*/

const fs = require('fs');

const input = fs.readFileSync('./input.txt').toString().split('\n');

const findMaxLengthWidth = () => {
	return input.reduce((acc, str) => {
		// str = '#1 @ 1,3: 4x4'
		const width = parseInt(str.split('@')[1].trim().split(',')[0]) + parseInt(str.split(':')[1].trim().split('x')[0]);
		const height = parseInt(str.split(',')[1].trim().split(':')[0]) + parseInt(str.split('x')[1].trim());
		acc.width = width > acc.width ? width : acc.width;
		acc.height = height > acc.height ? height : acc.height;

		return acc;
	}, {width: 0, height: 0});
};

const createArray = width => {
	const arr = new Array(width);

	return arr.fill(0);
};

const initializeFabric = dimensions => {
	const fabricArray = [];
	for (let i = 0; i < dimensions.height; i++) {
		fabricArray.push(createArray(dimensions.width));
	}

	return fabricArray;
};

const getOverlapUnits = (fabricArray) => {
	let overlap = 0;
	const noOverlapClaims = [];

	input.forEach(claim => {
		// claim = '#1 @ 1,3: 4x4'
		const leftMargin = parseInt(claim.split('@')[1].trim().split(',')[0]);
		const topMargin = parseInt(claim.split(',')[1].trim().split(':')[0]);
		const width = parseInt(claim.split(':')[1].trim().split('x')[0]);
		const height = parseInt(claim.split('x')[1].trim());
		let claimOverlap = 0;

		for (let i = topMargin; i < topMargin + height; i++) {
			for (let j = leftMargin; j < leftMargin + width; j++) {
				if (fabricArray[i][j] == 0) {
					fabricArray[i][j] = 1;
				} else if (fabricArray[i][j] == 1) {
					fabricArray[i][j] = 9;
					overlap++;
					claimOverlap++;
				}

			}
		}
		// this is the initial list of claims with no overlap when they were written 
		// but these may have been overwrtten later by other claims
		if (claimOverlap == 0) {
			noOverlapClaims.push(claim);
		}
	});
    
    // Find the claim with no overlap from the initial list
	noOverlapClaims.forEach(claim => {
		const leftMargin = parseInt(claim.split('@')[1].trim().split(',')[0]);
		const topMargin = parseInt(claim.split(',')[1].trim().split(':')[0]);
		const width = parseInt(claim.split(':')[1].trim().split('x')[0]);
		const height = parseInt(claim.split('x')[1].trim());
		let claimOverlap = 0;

		for (let i = topMargin; i < topMargin + height; i++) {
			for (let j = leftMargin; j < leftMargin + width; j++) {
				if (fabricArray[i][j] !== 1) {
					claimOverlap++;
				}

			}
		}
		if (claimOverlap == 0) {
			console.log(`Claim with no overlap is ${claim}`)
		}

	});

	return overlap;

};

const dimensions = findMaxLengthWidth();
const fabricArray = initializeFabric(dimensions);
const result = getOverlapUnits(fabricArray);
