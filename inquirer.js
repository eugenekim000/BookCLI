const inquirer = require('inquirer');
const colors = require('colors');
const { updateReadingList } = require('./index.js');

module.exports = function (query) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'save',
        message: 'Choose query to save',
        choices: query.map((item) => {
          //another possible option is to push title, author, and publisher
          //into an array, stringify it, and filter out {} and [].
          if (item === 'Cancel') return 'Cancel';

          const finalString = [];
          item.title
            ? finalString.push(item.title)
            : finalString.push('No Titles Found');

          resultChecker(finalString, item, 'authors');
          resultChecker(finalString, item, 'publisher');

          return finalString.join(' ');
        }),
      },
    ])
    .then(function (answers) {
      if (answers.save === 'Cancel') {
        console.log(colors.red('Query canceled.'));
      } else {
        updateReadingList(answers.save);
        console.log(colors.green('Query saved!'));
      }
    });
};

function resultChecker(stringArray, result, type) {
  stringArray.push(type.toUpperCase() + ':');
  result[type]
    ? result[type].map((item) => stringArray.push(item))
    : stringArray.push(`No ${type} found.`);
}
