fs = require('fs');
const grabTotals = require("./grabTotals.js");

async function main() {
  const data = await retreiveData();
  const formattedData = formatData(data, removeCommas);

  // const fakeData = { "landAverage": "4444", "landTotal": "40999", "networthAverage": "293629gc", "networthTotal": "6753469gc", "honorTotal": "72621" }
  readMasterDataAndAddNewData(formattedData);
  // writeFile(fakeData)
}

async function retreiveData() {
  return await grabTotals.main();
  // return {
  //   landTotal: '22,222 acres (avg: 1,748 acres)',
  //   networthTotal: '6,753,469gc (avg: 293,629gc)',
  //   honorTotal: '72,621'
  // }
}

function formatData(data, fn) {
  const formattedData = {};

  const landTotalString = data['landTotal'];
  const landTotalNumbers = selectNumbers(removeCommas(landTotalString));
  const landAverage = landTotalNumbers[1];
  const landTotal = landTotalNumbers[0];
  const currentDate = data['currentDate']

  const networthTotalString = data['networthTotal'];
  const networthTotalNumbers = selectNumbers(removeCommas(networthTotalString));
  const networthAverage = networthTotalNumbers[1];
  const networthTotal = networthTotalNumbers[0];

  formattedData['landAverage'] = landAverage;
  formattedData['landTotal'] = landTotal;
  formattedData['networthAverage'] = networthAverage;
  formattedData['networthTotal'] = networthTotal;
  formattedData['honorTotal'] = removeCommas(data['honorTotal']);
  formattedData['currentDate'] = currentDate;
  return formattedData;
}

function removeCommas(string) {
  return string.replace(/,\s?/g, "");
}

function selectNumbers(string) {
  const regExp = /\d+/g;
  return string.match(regExp);
}


//move this to another file
//you will need to validate the file is larger after you've written in it
async function readMasterDataAndAddNewData(newData) {
  fs.readFile('data.txt', 'utf8', function (err, masterData) {
    if (err) {
      return console.log(err);
    }
    parsedMasterData = JSON.parse(masterData);

    let updatedMasterData = addNewDataToSavedData(newData, parsedMasterData['age']);
    parsedMasterData['age'] = updatedMasterData;
    console.log(parsedMasterData);
    writeFile(parsedMasterData);
  });
}

function writeFile(data) {
  fs.writeFile('data.txt', JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}

function addNewDataToSavedData(newData, masterData) {
  console.log(masterData)
  // console.log(masterData)
  let updatedMasterData = masterData

  for (key in updatedMasterData) {
    const oldValue = updatedMasterData[key]
    oldValue.push(newData[key]);
    updatedMasterData[key] = oldValue;
  }
  return updatedMasterData;
}

main();