const program = require('commander');
const { getData, openReadingList } = require('./index.js');
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
  .command('open [dir]')
  .alias('o')
  .description('Open your reading list')
  .action(dir => {
    openReadingList(dir);
  });

program.parse(process.argv);
