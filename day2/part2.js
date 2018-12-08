// --- Part Two ---
// Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

// The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

// abcde
// fghij
// klmno
// pqrst
// fguij
// axcye
// wvxyz
// The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

// What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)

const fs = require('fs');

const input = fs.readFileSync('./input.txt').toString().split('\n');

input.some(str1 => {
	return input.some(str2 => {
		if (str1.split('').reduce((acc, ele, index) => {
			if (ele !== str2[index]) {
				return acc + 1;
			}

			return acc;

		}, 0) === 1 ) {
			console.log(`${str1} ${str2}`);
			return true;
		} 
	})
})
