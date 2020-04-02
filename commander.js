const program = require('commander');
const { getData, updateReadingList, openReadingList } = require('./index.js');
const queryOptions = require('./inquirer.js');

program.version('1.0.0').description('Book tracker CLI');

program
  .command('query <query...>')
  .alias('q')
  .description('Search for a book')
  .action(async query => {
    queriedBooks = await getData(query);
    queryOptions(queriedBooks);
  });

program
  .command('add <book> [dir]')
  .alias('a')
  .description('Add to your reading list')
  .action((book, dir) => {
    updateReadingList(queriedBooks[book], dir);
  });

program
  .command('open [dir]')
  .alias('o')
  .description('Open your reading list')
  .action(dir => {
    openReadingList(dir);
  });

program.parse(process.argv);

let queriedBooks = 'huh';
