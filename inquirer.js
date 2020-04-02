const inquirer = require('inquirer');
const colors = require('colors');

module.exports = function(query) {
  console.log(
    query.map(item => item.authors[0]),
    'from the beginning'
  );
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'save',
        message: 'Choose query to save',
        choices: query.map(item => item.authors[0])
      }
    ])
    .then(function(answers) {
      console.log(colors.grey('query to save'), answers.save);
    });
};
