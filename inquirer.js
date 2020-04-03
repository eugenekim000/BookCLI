const inquirer = require('inquirer');
const colors = require('colors');
const { updateReadingList } = require('./index.js');

module.exports = function(query) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'save',
        message: 'Choose query to save',
        choices: query.map(item => {
          const finalString = [];
          finalString.push(item.title);
          item.authors.map(author => finalString.push(author));
          item.publisher.map(publisher => finalString.push(publisher));

          console.log(finalString, 'final string');
          return finalString.join(' ');
        })
      }
    ])
    .then(function(answers) {
      updateReadingList(answers.save);
      console.log(colors.green('query saved!'));
    });
};

//TODO

//make sure the saved function checks if the user selected cancel.
