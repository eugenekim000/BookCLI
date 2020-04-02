const program = require('commander');
const { getData, updateReadingList, openReadingList } = require('./index.js');

program.version('1.0.0').description('Book tracker CLI');

program
  .command('query <query...>')
  .alias('q')
  .description('Search for a book')
  .action(query => {
    console.log(query, 'this is the final query');
    getData(query);
  });

program
  .command('open [dir]')
  .alias('o')
  .description('Open your reading list')
  .action(dir => {
    updateReadingList(dir);
  });

program.parse(process.argv);
