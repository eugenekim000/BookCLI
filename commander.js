const program = require('commander');
const { getData, openReadingList } = require('./index.js');
const queryOptions = require('./inquirer.js');
const colors = require('colors');

program.version('1.0.0').description('Book tracker CLI');

program
  .command('query <query...>')
  .alias('q')
  .description('Search for a book')
  .action(async (query) => {
    queriedBooks = await getData(query);
    if (queriedBooks === undefined) {
      console.log(colors.red('No Books Found. Please query again.'));
    } else {
      queryOptions(queriedBooks);
    }
  })
  .on('command:*', function (command) {
    const firstCommand = command[0];
    if (!this.commands.find((c) => c._name == firstCommand)) {
      console.error(
        'Invalid command: %s\nSee --help for a list of available commands.',
        program.args.join(' ')
      );
      process.exit(1);
    }
  });

program
  .command('open [dir]')
  .alias('o')
  .description('Open your reading list')
  .action((dir) => {
    openReadingList(dir);
  });

program.parse(process.argv);
