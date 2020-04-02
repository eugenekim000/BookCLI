//https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5
const axios = require('axios');

const url =
  'https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5';

const getData = async url => {
  try {
    const response = await axios.get(url);
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

console.log('hello, please type in your query')
getData(url);

//author, title, publishing company
