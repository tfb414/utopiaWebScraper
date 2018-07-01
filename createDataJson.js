fs = require('fs');
const grabTotals = require("./grabTotals.js");


async function main() {
  const data = await retreiveData();

  // const data = { "July 6, YR5": { "ourKd": { "landTotal": "37,721 acres (avg: 1,508 acres)", "networthTotal": "8,634,682gc (avg: 345,387gc)", "honorTotal": "73,712", "provinces": { "CC2 Bridge Too Far": { "acres": "1,788 acres", "networth": "350,198gc", "networthPerAcre": "195gc", "race": "Dark Elf", "honor": "Viscount", "name": "CC2 Bridge Too Far" }, "Diablo 2 LoD": { "acres": "1,547 acres", "networth": "375,416gc", "networthPerAcre": "242gc", "race": "Avian", "honor": "Viscount", "name": "Diablo 2 LoD" }, "Path of Exile*": { "acres": "191 acres", "networth": "115,364gc", "networthPerAcre": "604gc", "race": "Avian", "honor": "Baron", "name": "Path of Exile*" }, "Saiyuuki World": { "acres": "2,057 acres", "networth": "481,655gc", "networthPerAcre": "234gc", "race": "Dark Elf", "honor": "Baron", "name": "Saiyuuki World" }, "Nether Earth": { "acres": "1,864 acres", "networth": "512,093gc", "networthPerAcre": "274gc", "race": "Elf", "honor": "Viscount", "name": "Nether Earth" }, "Battle Chess": { "acres": "2,358acres", "networth": "455,885gc", "networthPerAcre": "193gc", "race": "Dark Elf", "honor": "Count", "name": "Battle Chess" }, "Heroes III WoG": { "acres": "1,957 acres", "networth": "365,698gc", "networthPerAcre": "186gc", "race": "Halfling", "honor": "Lord", "name": "Heroes III WoG" }, "Command Conquer": { "acres": "1,705 acres", "networth": "325,313gc", "networthPerAcre": "190gc", "race": "Avian", "honor": "Lord", "name": "Command Conquer" }, "StarCraft": { "acres": "1,894 acres", "networth": "551,398gc", "networthPerAcre": "291gc", "race": "Faery", "honor": "Viscount", "name": "StarCraft" }, "Destiny": { "acres": "1,816 acres", "networth": "360,194gc", "networthPerAcre": "198gc", "race": "Halfling", "honor": "Viscount", "name": "Destiny" }, "Broken Sword": { "acres": "968 acres", "networth": "288,065gc", "networthPerAcre": "297gc", "race": "Dark Elf", "honor": "Baroness", "name": "Broken Sword" }, "AoE II The Conquerors": { "acres": "968 acres", "networth": "287,927gc", "networthPerAcre": "297gc", "race": "Avian", "honor": "Baron", "name": "AoE II The Conquerors" }, "Bubble Bobble (S)": { "acres": "2,644 acres", "networth": "525,649gc", "networthPerAcre": "198gc", "race": "Elf", "honor": "Baron", "name": "Bubble Bobble (S)" }, "Minesweeper": { "acres": "2,038 acres", "networth": "469,817gc", "networthPerAcre": "230gc", "race": "Elf", "honor": "Count", "name": "Minesweeper" }, "Super Mario": { "acres": "1,197 acres", "networth": "254,971gc", "networthPerAcre": "213gc", "race": "Avian", "honor": "Lord", "name": "Super Mario" }, "NoOneLivesForever": { "acres": "1,961 acres", "networth": "490,881gc", "networthPerAcre": "250gc", "race": "Elf", "honor": "Countess", "name": "NoOneLivesForever" }, "Conkers Bad Fur Day (M)": { "acres": "1,791 acres", "networth": "473,057gc", "networthPerAcre": "264gc", "race": "Elf", "honor": "King", "name": "Conkers Bad Fur Day (M)" }, "Morrowind*": { "acres": "1,609 acres", "networth": "325,891gc", "networthPerAcre": "202gc", "race": "Halfling", "honor": "Baron", "name": "Morrowind*" }, "Baldurs gate": { "acres": "1,226 acres", "networth": "281,702gc", "networthPerAcre": "229gc", "race": "Faery", "honor": "Noble Lady", "name": "Baldurs gate" }, "Mister Mosquito": { "acres": "383 acres", "networth": "123,592gc", "networthPerAcre": "322gc", "race": "Dark Elf", "honor": "Lady", "name": "Mister Mosquito" }, "Portal*": { "acres": "2,251 acres", "networth": "432,818gc", "networthPerAcre": "192gc", "race": "Dark Elf", "honor": "Viscount", "name": "Portal*" }, "Minecraft": { "acres": "443 acres", "networth": "242,273gc", "networthPerAcre": "546gc", "race": "Avian", "honor": "Baron", "name": "Minecraft" }, "Legend of the Seven Stars (S)": { "acres": "2,038 acres", "networth": "389,760gc", "networthPerAcre": "191gc", "race": "Halfling", "honor": "Baron", "name": "Legend of the Seven Stars (S)" }, "Death from above": { "acres": "482 acres", "networth": "78,427gc", "networthPerAcre": "162gc", "race": "Avian", "honor": "Lord", "name": "Death from above" }, "Blinky Attack*": { "acres": "545 acres", "networth": "76,638gc", "networthPerAcre": "140gc", "race": "Avian", "honor": "Lord", "name": "Blinky Attack*" } } }, "enemyKd": { "landTotal": "44,214 acres (avg: 1,768 acres)", "networthTotal": "10,157,717gc (avg: 406,308gc)", "honorTotal": "62,751", "provinces": { "Fearless*": { "acres": "1,825 acres", "networth": "475,494gc", "networthPerAcre": "260gc", "race": "Halfling", "honor": "Baron", "name": "Fearless*" }, "coffeeortea (M)*": { "acres": "2,142 acres", "networth": "403,186gc", "networthPerAcre": "188gc", "race": "Orc", "honor": "King", "name": "coffeeortea (M)*" }, "ShadowOfDeath": { "acres": "2,260 acres", "networth": "399,851gc", "networthPerAcre": "176gc", "race": "Orc", "honor": "Lady", "name": "ShadowOfDeath" }, "Dacian Ciolos": { "acres": "1,804 acres", "networth": "515,659gc", "networthPerAcre": "285gc", "race": "Dark Elf", "honor": "Marquis", "name": "Dacian Ciolos" }, "Gigs": { "acres": "1,856 acres", "networth": "468,119gc", "networthPerAcre": "252gc", "race": "Halfling", "honor": "Baron", "name": "Gigs" }, "De Schaar": { "acres": "895 acres", "networth": "212,296gc", "networthPerAcre": "237gc", "race": "Orc", "honor": "Lord", "name": "De Schaar" }, "Gurthen*": { "acres": "2,166 acres", "networth": "473,064gc", "networthPerAcre": "218gc", "race": "Dark Elf", "honor": "Count", "name": "Gurthen*" }, "69 sushi plz": { "acres": "250 acres", "networth": "211,641gc", "networthPerAcre": "846gc", "race": "Orc", "honor": "Knight", "name": "69 sushi plz" }, "VooDoo": { "acres": "2,811 acres", "networth": "552,439gc", "networthPerAcre": "196gc", "race": "Orc", "honor": "Baron", "name": "VooDoo" }, "Kemosabe": { "acres": "2,045 acres", "networth": "381,798gc", "networthPerAcre": "186gc", "race": "Orc", "honor": "Baroness", "name": "Kemosabe" }, "gambit": { "acres": "2,438 acres", "networth": "490,073gc", "networthPerAcre": "201gc", "race": "Avian", "honor": "Viscount", "name": "gambit" }, "Avian": { "acres": "1,972 acres", "networth": "347,888gc", "networthPerAcre": "176gc", "race": "Orc", "honor": "Baron", "name": "Avian" }, "Evil Gani": { "acres": "2,188 acres", "networth": "432,448gc", "networthPerAcre": "197gc", "race": "Orc", "honor": "Baron", "name": "Evil Gani" }, "Magic Tyrant": { "acres": "256 acres", "networth": "144,464gc", "networthPerAcre": "564gc", "race": "Dryad", "honor": "Knight", "name": "Magic Tyrant" }, "Dabawenyo": { "acres": "1,755 acres", "networth": "458,154gc", "networthPerAcre": "261gc", "race": "Dark Elf", "honor": "Viscount", "name": "Dabawenyo" }, "Spoons (S)": { "acres": "2,232 acres", "networth": "534,066gc", "networthPerAcre": "239gc", "race": "Halfling", "honor": "Baron", "name": "Spoons (S)" }, "Slaughterzone": { "acres": "2,815 acres", "networth": "542,326gc", "networthPerAcre": "192gc", "race": "Orc", "honor": "Baron", "name": "Slaughterzone" }, "course Bern 69ed ur daughter (S)*": { "acres": "434 acres", "networth": "199,428gc", "networthPerAcre": "459gc", "race": "Orc", "honor": "Knight", "name": "course Bern 69ed ur daughter (S)*" }, "Sphyrboo*": { "acres": "3,122 acres", "networth": "600,686gc", "networthPerAcre": "192gc", "race": "Orc", "honor": "Baron", "name": "Sphyrboo*" }, "Faust*": { "acres": "303 acres", "networth": "248,319gc", "networthPerAcre": "819gc", "race": "Orc", "honor": "Knight", "name": "Faust*" }, "Shady Contractors": { "acres": "1,911 acres", "networth": "420,974gc", "networthPerAcre": "220gc", "race": "Halfling", "honor": "Baron", "name": "Shady Contractors" }, "Bandu": { "acres": "2,041 acres", "networth": "481,089gc", "networthPerAcre": "235gc", "race": "Dark Elf", "honor": "Count", "name": "Bandu" }, "Grim Reaper": { "acres": "2,260 acres", "networth": "514,808gc", "networthPerAcre": "227gc", "race": "Orc", "honor": "Baron", "name": "Grim Reaper" }, "Sozinistan": { "acres": "1,704 acres", "networth": "382,364gc", "networthPerAcre": "224gc", "race": "Orc", "honor": "Baron", "name": "Sozinistan" }, "Digby*": { "acres": "729 acres", "networth": "267,083gc", "networthPerAcre": "366gc", "race": "Orc", "honor": "Knight", "name": "Digby*" } } } } }

  // console.log('raw data', data);
  console.log('data', data);
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
  const ourKdHonor = removeCommas(data[currentDate].ourKd.honorTotal);

  const ourKdProvinces = loopThroughProvinces(data[currentDate].ourKd.provinces);

  if (data[currentDate].featureToggles.getEnemyKdData) {
    console.log('inside feature toggle block for enemy kd')
    const enemyKdHonor = removeCommas(data[currentDate].enemyKd.honorTotal);
    const enemyKdProvinces = loopThroughProvinces(data[currentDate].enemyKd.provinces);
    const enemyKdIncludingLandAverages = splitTotalsAndAverageFromTotals(data[currentDate].enemyKd.landTotal);
    const enemyKdIncludingNetworthAverages = splitTotalsAndAverageFromTotals(data[currentDate].enemyKd.networthTotal);
  }

  const cleanedData = {
    [currentDate]: {
      ourKd: {
        totals: {
          landTotal: ourKdWithLandAverages[0],
          landAverage: ourKdWithLandAverages[1],
          networthTotal: ourKdWithNetworthAverages[0],
          networthAverage: ourKdWithNetworthAverages[1],
          honorTotal: ourKdHonor,
          war: false,
        },
        provinces: ourKdProvinces
      }
      // enemyKd: {
      //   totals: {
      //     landTotal: enemyKdIncludingLandAverages[0],
      //     landAverage: enemyKdIncludingLandAverages[1],
      //     networthTotal: enemyKdIncludingNetworthAverages[0],
      //     networthAverage: enemyKdIncludingNetworthAverages[1],
      //     honorTotal: enemyKdHonor
      //   },
      //   provinces: enemyKdProvinces
      // }
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

function removeCommasAndLetters(string) {
  const newString = JSON.stringify(string);
  let noCommas = removeCommas(newString);
  return removeLetters(noCommas)
}

function removeCommas(string) {
  return string.replace(/,\s?/g, "");
}

function selectNumbers(string) {
  const regExp = /\d+/g;
  return string.match(regExp);
}

function removeLetters(string) {
  return string.replace(/\D/g, "");
}

function removeSpecialCharacters(string) {
  let noSpecialCharacters = string.replace(/[!@#$%^&*]/g, "");
  return noSpecialCharacters.replace(/\(.*?\)/g, "");
}

function loopThroughProvinces(provinces) {
  return Object.keys(provinces).map((province) => {
    return removeSpecialCharactersFromObjects(provinces[province]);
  })
}

function removeSpecialCharactersFromObjects(province) {
  const cleanProvince = {};
  let newProvince = province;
  // console.log(province);


  const cleanName = removeSpecialCharacters(province.name);
  const cleanAcres = removeCommasAndLetters(province.acres);
  const cleanNetworth = removeCommasAndLetters(province.networth);
  const cleanNetworthPerAcre = removeCommasAndLetters(province.networthPerAcre);

  newProvince.name = cleanName;
  newProvince.acres = cleanAcres;
  newProvince.networthPerAcre = cleanNetworthPerAcre;
  newProvince.networth = cleanNetworth
  cleanProvince[cleanName] = { ...newProvince }
  return cleanProvince;

}

//move this to another file
//you will need to validate the file is larger after you've written in it
//also maybe change then to append something to the end? delete last bracket and add stuff + one more bracket?
async function readMasterDataAndAddNewData(newData) {
  fs.readFile('data.txt', 'utf8', function (err, masterData) {
    if (err) {
      return console.log(err);
    }
    console.log('here', masterData)
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