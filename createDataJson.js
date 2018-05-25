// import {main} from 'grabTotals';
const grabTotals = require("./grabTotals.js");

async function main() {
  await retreiveData();
}

async function retreiveData() {
  // const data = await grabTotals.main();
  // console.log(data);

  const data = { landTotal: '40,193 acres (avg: 1,747 acres)',
  networthTotal: '6,753,469gc (avg: 293,629gc)',
  honorTotal: '72,621' }

  console.log(data);
}

function cleanData() {

}
main();