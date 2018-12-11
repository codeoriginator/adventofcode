const fs = require('fs');
let str = fs.readFileSync('./input.txt').toString();
const removeReactingChars = (i) => {
	if (i > 0 && i < str.length - 1) {
		str = str.substring(0, i).concat(str.substring(i+2));
	} else if (i == 0) {
		str = str.substring(i+2);
	} else if (i == str.length - 1) {
		str = str.substring(0, i);
	}
};

let i = 0;
while(i < str.length - 1) {
	const char1 = str[i];
	const char2 = str[i+1];

	if (char1 == char1.toUpperCase() ) {
		if (char1.toLowerCase() == char2 ) {
			removeReactingChars(i);
			i = 0;
		} else {
			i++;
		}
	} else if (char1 == char1.toLowerCase()) {
		if (char1.toUpperCase() == char2 ) {
			removeReactingChars(i);
			i = 0;
		} else {
			i++;
		}

	} else {
		i++;
	}
}

console.log(str.length);

