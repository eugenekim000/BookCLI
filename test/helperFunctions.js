const fs = require('fs');
const util = require('util');

function deleteLastLine() {
	fs.readFile('./test/readingList.txt', 'utf8', function (err, data) {
		if (err) {
			console.log(err);
		}

		const linesExceptLast = data.split('\n');
		const newLines = linesExceptLast
			.slice(0, linesExceptLast.length - 1)
			.join('\n');
		fs.writeFile('./test/readingList.txt', newLines, () => {});
	});
}

async function getLineLength() {
	let test = await fs.readFile('./readingList.txt', 'utf8', function (
		err,
		data
	) {
		if (err) {
			console.log(err);
		}

		console.log(data.split('\n').length);
		return data.split('\n').length;
	});

	return test;
}

async function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
}

async function fileLength() {
	let data = await readFile('./test/readingList.txt');
	console.log(data.split('\n').length);
	return data.split('\n').length;
}

fileLength().then((data) => console.log(data));

module.exports = { deleteLastLine, getLineLength, fileLength };
