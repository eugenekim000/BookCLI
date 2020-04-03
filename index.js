const axios = require('axios');
const fs = require('fs');

const getData = async query => {
  try {
    let responseArray = [];

    if (Array.isArray(query)) {
      query = query.join('+');
    }
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
    );

    response.data.items.map(data => {
      responseArray.push({
        authors: data.volumeInfo.authors,
        title: data.volumeInfo.title,
        publisher: data.volumeInfo.authors
      });
    });

    return responseArray;
  } catch (error) {
    console.log(error);
  }
};

const updateReadingList = (book, dir) => {
  const saveDirectory = dir ? dir : '';

  fs.appendFile(`${saveDirectory}readingList.txt`, `\n${book}`, function(err) {
    if (err) throw err;
    console.log('File is created successfully.');
  });
};

const openReadingList = dir => {
  const saveDirectory = dir ? dir : '';

  const readingList = fs.readFileSync(
    `${saveDirectory}readingList.txt`,
    'utf8',
    function(err) {
      if (err) throw err;
    }
  );
  console.log(readingList);
};

module.exports = {
  getData,
  updateReadingList,
  openReadingList
};
