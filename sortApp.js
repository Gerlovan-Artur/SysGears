const fs = require('fs');

function parsedata(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const parsedData = JSON.parse(data);
      callback(null, parsedData);
    } catch (error) {
      callback(error, null);
    }
  });
}

function filterAndSortData(data, condition) {
  let filteredData = data;

  // Відфільтрувати дані за правилом exclude
  if (condition.exclude) {
    filteredData = filteredData.filter(item => {
      for (let excludeCondition of condition.exclude) {
        let match = true;
        for (let key in excludeCondition) {
          if (item[key] === excludeCondition[key]) {
            match = false;
            break;
          }
        }
        if (!match) {
          return false;
        }
      }
      return true;
    });
  }
  
  // Відсортувати дані за ключами з правила sortBy
  if (condition.sortBy) {
    filteredData.sort((a, b) => {
      for (let key of condition.sortBy) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
      }
      return 0;
    });
  }
  
  return filteredData;
}

parsedata('data.json', (err, data) => {
  if (err) {
    console.error('Error reading data file:', err);
    return;
  }

  const inputData = {
    data: data.data,
    condition: data.condition
  };

  const result = filterAndSortData(inputData.data, inputData.condition);
  const outputData = { "result": result };
  console.log(JSON.stringify(outputData));
});