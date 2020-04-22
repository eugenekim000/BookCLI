const expect = require('chai').expect;
const axios = require('axios');
const fs = require('fs');
const { deleteLastLine } = require('./helperFunctions');

describe('The Book CLI', () => {
  it('should print the correct output', async () => {
    const response = await execute('./commander.js', ['q', 'harry potter']);

    const responseAPI = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5'
    );

    const responseArray = [];
    responseAPI.data.items.map((data) => {
      responseArray.push({
        authors: data.volumeInfo.authors,
        title: data.volumeInfo.title,
        publisher: data.volumeInfo.authors,
      });
    });

    responseArrayString = responseArray.join('\n');

    expect(response.to.have.all.keys(responseArrayString));
  });

  it('should add to the list', async () => {
    const totalLinesReadingList = await fs.readFileSync(
      '../readingList.txt',
      'utf8'
    ).length;

    const response = await cmd.execute('./commander.js', ['q', 'harry potter']);
    //TODO
    //need to add inquirer user input

    const totalNewLinesReadingList = await fs.readFileSync(
      '../testReadingList.txt',
      'utf8'
    ).length;
    expect(totalNewLinesReadingList.to.equal(totalLinesReadingList + 1));
  });

  it('should print if no result is found', async () => {
    const response = await cmd.execute('./commander.js', [
      'q',
      'jdhfkhjksdahjkhf',
    ]);
    expect(
      response.to.equal('undefined\n No Books Found. Please query again.')
    );
    deleteLastLine();
  });
});
