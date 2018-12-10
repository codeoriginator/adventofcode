const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');
let inputObj = input.map((str) => {
	const dateStr = str.split(']')[0].substring(1);
	const date = new Date(dateStr);
	let guardId;
	let operation = '';
	if (str.includes('begins')) {
		operation = 'begins';
		guardId = parseInt(str.split('#')[1].split(' ')[0]);
	} else if (str.includes('asleep')) {
		operation = 'asleep'
	} else if (str.includes('wakes')) {
		operation = 'wakes'
	}
	return {date, dateStr, guardId, operation};

});

inputObj.sort((objA, objB) => {
	return objA.date - objB.date;
})


// Shelved the below as creating a nested object is complicating the code. 
/*inputObj.forEach((rec, index) => {
	let day;
	let guardRecord = {};
	let dayRecord = {};
	if (rec.operation == 'begins') {
		guardId = rec.guardId;
		day = rec.dateStr.split(' ')[0];
		const arr = new Array(60).fill(0);
		if (dutyRecord.hasOwnProperty(guardId)) {
			dutyRecord[guardId] = {[day]: arr};
		} else {
			dutyRecord[guardId] = {};
			guardRecord = dutyRecord[guardId];
			guardRecord[day] = arr;
		}
		
	} else if (rec.operation == 'asleep') {
		sleepTime = parseInt(rec.dateStr.split(':')[1]);
	} else if (rec.operation == 'wakes') {
		wakeTime = parseInt(rec.dateStr.split(':')[1]);
		day = rec.dateStr.split(' ')[0];
		
		for (let i = sleepTime; i < wakeTime; i++) {
			guardRecord = dutyRecord[guardId];
			dayRecord = guardRecord[day];
			//dayRecord[i] = 1;
		}
	}
});*/


// Record the sleep time for all guards
let dayRecords = [];
let guardId = 0;
let sleepTime = 0;
let wakeTime = 0;

inputObj.forEach((rec, index) => {
	const duty = new Array(60).fill(0);
	const day = rec.dateStr.split(' ')[0];
	if (rec.operation == 'begins') {
		guardId = rec.guardId;
	} else if (rec.operation == 'asleep') {
		sleepTime = parseInt(rec.dateStr.split(':')[1]);
		if (dayRecords.findIndex((ele) => {
			return ele.guardId == guardId && ele.day == day;
		}) == -1) {
			dayRecords.push({
			day,
			guardId,
			duty
			});
		}
	} else if (rec.operation == 'wakes') {
		wakeTime = parseInt(rec.dateStr.split(':')[1]);
		
		const idx = dayRecords.findIndex((ele) => {
			return ele.guardId == guardId && ele.day == day;
		});
		for (let i = sleepTime; i < wakeTime; i++) {
			dayRecords[idx].duty[i] = 1;
		}
	}
});

// calculate the total sleep minutes for all guards
const sleepReport = {};

dayRecords.forEach((rec) => {
	const guardId = rec.guardId;
	let sleepMinutes = rec.duty.reduce((acc, ele) => {
		return acc + ele;
	}, 0);

	if (sleepReport.hasOwnProperty(guardId)) {
		sleepReport[guardId] += sleepMinutes;
	} else {
		sleepReport[guardId] = sleepMinutes;
	}
});

const getSleepyGuard = () => {
	let mostSleepyGuard;
	let sleepMinutes = 0;

	Object.keys(sleepReport).forEach((key) => {
		if (sleepReport[key] > sleepMinutes) {
			mostSleepyGuard = key;
			sleepMinutes = sleepReport[key];
		}
	});
	console.log('Most sleepy guard ID', mostSleepyGuard);

	return mostSleepyGuard;
}

const sleepyGuardID = getSleepyGuard();


const guardSleepReport = new Array(60).fill(0);

const getGuardSleepReport = (gID) => {
	dayRecords.forEach(rec => {
		if (rec.guardId == gID) {
			rec.duty.forEach((ele, index) => {
				guardSleepReport[index] += ele;
			});
		}
	});
};

getGuardSleepReport(sleepyGuardID);

const getGuardSleepyMinute = () => {
	let largest = 0;
	guardSleepReport.forEach(ele => {
		if (ele > largest) {
			largest = ele;
		}
	});

	console.log('Most sleepy minutes', guardSleepReport.indexOf(largest));

};

getGuardSleepyMinute();




