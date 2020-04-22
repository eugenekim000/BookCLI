const axios = require('axios');
const fs = require('fs');
const colors = require('colors');

const getData = async (query) => {
	try {
		let responseArray = [];

		if (Array.isArray(query)) {
			query = query.join('+');
		}

		const response = await axios({
			method: 'get',
			url: `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`,
			timeout: 1000 * 15, //timeout after 15 seconds
		}).catch(function (error) {
			if (error.timeout) {
				console.log('Error, timeout exceeded.');
			}
		});

		if (response.totalItems === 0) {
			return;
		}
		response.data.items.map((data) => {
			responseArray.push({
				authors: data.volumeInfo.authors,
				title: data.volumeInfo.title,
				publisher: data.volumeInfo.authors,
			});
		});

		return responseArray;
	} catch (error) {
		console.log('Error in query.');
	}
};

const updateReadingList = async (book, dir) => {
	const saveDirectory = dir ? dir : '';

	fs.appendFile(`${saveDirectory}readingList.txt`, `\n${book}`, function (err) {
		if (err) throw err;
		console.log('File is created successfully.');
	});
};

const openReadingList = (dir) => {
	const saveDirectory = dir ? dir : '';
	try {
		const readingList = fs.readFileSync(
			`${saveDirectory}readingList.txt`,
			'utf8'
		);
		console.log(readingList);
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.log(colors.red(`Cannot find directory! $${dir}`));
		} else {
			console.log(colors.red(err));
		}
	}
};

module.exports = {
	getData,
	updateReadingList,
	openReadingList,
};
