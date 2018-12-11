const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
//let input = 'dabAcCaCBAcCcaDA';

const removeReactingChars = (str, i) => {
	if (i > 0 && i < str.length - 1) {
		str = str.substring(0, i).concat(str.substring(i+2));
	} else if (i == 0) {
		str = str.substring(i+2);
	} else if (i == str.length - 1) {
		str = str.substring(0, i);
	}

	return str;
};

const reactChars = (str) => {
	let i = 0;
	while(i < str.length - 1) {
		const char1 = str[i];
		const char2 = str[i+1];

		if (char1 == char1.toUpperCase() ) {
			if (char1.toLowerCase() == char2 ) {
				str = removeReactingChars(str, i);
				i = 0;
			} else {
				i++;
			}
		} else if (char1 == char1.toLowerCase()) {
			if (char1.toUpperCase() == char2 ) {
				str = removeReactingChars(str, i);
				i = 0;
			} else {
				i++;
			}

		} else {
			i++;
		}
	}

	return str;
}


const arr = [];
// arr = ['[aA]', '[bB]', ....  '[zZ]']
for(var i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
    arr.push('[' + String.fromCharCode(i) + String.fromCharCode(i).toUpperCase() + ']');
}
let result = 0;
arr.forEach((ele, index) => {
	const regex = new RegExp(arr[index],'g');
	const str1 = input.replace(regex, '');
	const str2 = reactChars(str1)
	console.log(str2.length);
	if (result == 0 || result > str2.length) {
		result = str2.length;
	}
});

console.log('result is ', result);


