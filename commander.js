const program = require('commander');
const { getData } = require('./index.js');

program.version('1.0.0').description('Book tracker CLI');

program
  .command('query <query...>')
  .alias('q')
  .description('Search for a book')
  .action(query => {
    console.log(query, 'this is the final query');
    getData(query);
  });

program.parse(process.argv);
