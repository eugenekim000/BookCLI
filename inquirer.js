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
      updateReadingList(answers.save);
      console.log(colors.green('query saved!'));
    });
};

function resultChecker(stringArray, result, type) {
  stringArray.push(type.toUpperCase() + ':');
  console.log(result);
  console.log(result[type], 'result type!!');
  result[type]
    ? result[type].map((item) => stringArray.push(item))
    : stringArray.push(`No ${type} found.`);
}
