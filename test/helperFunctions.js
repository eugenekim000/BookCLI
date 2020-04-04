const deleteLastLine = fs.readFile('./readingList.txt', 'utf8', function (
  err,
  data
) {
  if (err) {
    console.log(err);
  }

  const linesExceptLast = data.split('\n');
  const newLines = linesExceptLast
    .slice(0, linesExceptLast.length - 1)
    .join('\n');
  fs.writeFile('./readingList.txt', newLines, () => {});
});

module.exports = { deleteLastLine };
