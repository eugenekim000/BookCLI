const axios = require('axios');
const fs = require('fs');

const getData = async query => {
  try {
    if (Array.isArray(query)) {
      query = query.join('+');
    }
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
    );
    const data = response.data;
    for (let i = 0; i < data.items.length; i++) {
      console.log(data.items[i].volumeInfo.authors);
      console.log(data.items[i].volumeInfo.title);
      console.log(data.items[i].volumeInfo.publisher);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateReadingList = dir => {
  const saveDirectory = dir ? dir : '';

  fs.appendFile(`${saveDirectory}readingList.txt`, '\ntest', function(err) {
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

openReadingList();
//console.log(getData('harrypotter'));

module.exports = {
  getData,
  updateReadingList,
  openReadingList
};
