fs = require('fs');
const grabTotals = require("./grabTotals.js");

async function main() {
  const data = await retreiveData();
  
  
  // const data = { 'Apr 10, YR5':
  // { ourKd:
  //    { landTotal: '1111,1 acres (avg: 1,655 acres)',
  //      networthTotal: '10,105,632gc (avg: 454,818gc)',
  //      honorTotal: '73,553' },
  //   enemyKd:
  //    { landTotal: '42,574 acres (avg: 1,702 acres)',
  //      networthTotal: '11,782,829gc (avg: 471,313gc)',
  //      honorTotal: '64,342' } } }
       
  // console.log('raw data', data);
  const formattedData = formatData(data);
  
  readMasterDataAndAddNewData(formattedData);
}

async function retreiveData() {
  return await grabTotals.main();
  
}



function formatData(data) {
  const currentDate = Object.keys(data)[0];

  const ourKdWithLandAverages = splitTotalsAndAverageFromTotals(data[currentDate].ourKd.landTotal);
  const ourKdWithNetworthAverages = splitTotalsAndAverageFromTotals(data[currentDate].ourKd.networthTotal);
  const enemyKdIncludingLandAverages = splitTotalsAndAverageFromTotals(data[currentDate].enemyKd.landTotal);
  const enemyKdIncludingNetworthAverages = splitTotalsAndAverageFromTotals(data[currentDate].enemyKd.networthTotal);
  const ourKdHonor = removeCommas(data[currentDate].ourKd.honorTotal);
  const enemyKdHonor = removeCommas(data[currentDate].enemyKd.honorTotal);

  const cleanedData = {
    [currentDate]: {
      ourKd: {
        totals:{
          landTotal: ourKdWithLandAverages[0],
          landAverage: ourKdWithLandAverages[1],
          networthTotal: ourKdWithNetworthAverages[0],
          networthAverage: ourKdWithNetworthAverages[1],
          honorTotal: ourKdHonor,
          war: "yes",
        },
        provinces: {}
      },
      enemyKd: {
        totals: {
          landTotal: enemyKdIncludingLandAverages[0],
          landAverage: enemyKdIncludingLandAverages[1],
          networthTotal: enemyKdIncludingNetworthAverages[0],
          networthAverage: enemyKdIncludingNetworthAverages[1],
          honorTotal: enemyKdHonor
        },
        provinces: {}
      }
    }
  }

  // console.log(JSON.stringify(cleanedData));
  return cleanedData;
}

function splitTotalsAndAverageFromTotals(totalAndAverage) {
  const noCommas = removeCommas(totalAndAverage);
  const onlyNumbers = selectNumbers(noCommas);
  return onlyNumbers;
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
    const currentDate = Object.keys(newData)[0];

    parsedMasterData[currentDate] = newData[currentDate];
    
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

main();