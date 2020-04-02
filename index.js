const axios = require('axios');

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

//console.log(getData('harrypotter'));

module.exports = {
  getData
};
