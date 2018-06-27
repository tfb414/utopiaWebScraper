const puppeteer = require("puppeteer");
const env = require("dotenv").config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const BASE_URL = "http://utopia-game.com/shared/?next=/wol/game/throne";
const LOGIN_BOX = "#id_username";
const PASSWORD_BOX = "#id_password";
const LOGIN_BUTTON = ".g-recaptcha";
const NAVIGATION_LINKS = ".navigation";
const KINGDOM_TABLE = ".tablesorter";
const KINGDOM_URL = "http://utopia-game.com/wol/game/kingdom_details";
const KINGDOM_SIZE = 25;

const KINGDOM_NUMBER_BOX_ID = "#id_kingdom";
const KINGDOM_ISLAND_BOX_ID = "#id_island";
const CHANGE_KINGDOM_BUTTON = "#change-kingdom-button";

const HONOR_SELECTOR_ID = 3;
const LAND_SELECTOR_ID = 2;
const NETWORTH_SELECTOR_ID = 1;

const getEnemyKdData = false;

async function main() {
  let grabbedData = {
    ourKd: {},
    enemyKd: {},
    featureToggles: {
      getEnemyKdData: false
    }
  };

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("up next: login");
  await login(page);
  console.log("up next: navigate to kd page");
  await navigateToKingdomPage(page);

  
  const ourKdProvinces = await kingdomTableRows(page);
  console.log("up next: return local totals");
  grabbedData.ourKd["landTotal"] = await grabTotal(page, LAND_SELECTOR_ID);
  grabbedData.ourKd["networthTotal"] = await grabTotal(page, NETWORTH_SELECTOR_ID);
  grabbedData.ourKd["honorTotal"] = await grabTotal(page, HONOR_SELECTOR_ID);
  grabbedData.ourKd.provinces = ourKdProvinces;
  
  const currentDate = await grabDate(page);

  if(getEnemyKdData){
  await navigateTo(page, 6, 9);
  await delay(10000);
  grabbedData.enemyKd["landTotal"] = await grabTotal(page, LAND_SELECTOR_ID);
  grabbedData.enemyKd["networthTotal"] = await grabTotal(page, NETWORTH_SELECTOR_ID);
  grabbedData.enemyKd["honorTotal"] = await grabTotal(page, HONOR_SELECTOR_ID);
  const enemyKdProvinces = await kingdomTableRows(page);
  grabbedData.enemyKd.provinces = enemyKdProvinces;
  }

  return {
    [currentDate]: grabbedData
  }
}

async function login(page) {
  await page.goto(BASE_URL);
  await delay(10000);
  page.click(LOGIN_BOX);
  await page.keyboard.type(USERNAME);
  await page.click(PASSWORD_BOX);
  await page.keyboard.type(PASSWORD);
  await page.click(LOGIN_BUTTON);
}

async function navigateToKingdomPage(page) {
  console.log("inside navigateToKdPageFunction");
  await delay(10000);
  page.goto(KINGDOM_URL);
  console.log("should be at kd page");
  await page.waitForSelector(KINGDOM_TABLE);
}

async function navigateTo(page, kingdomNumber, islandNumber) {
  console.log('inside')
  await delay(10000);
  await page.evaluate(() => {
    document.querySelector('#id_kingdom').value = 6
    document.querySelector('#id_island').value = 9
  })
  await page.click(CHANGE_KINGDOM_BUTTON)
}

async function kingdomTableRows(page) {
  console.log('inside the big one')
  await delay(10000);
  let provinces = {};
 
  for (let i = 0; i < KINGDOM_SIZE; i++) {
    
    let row = await page.evaluate((i) => {

      let province = {
        acres: "",
        networth: "",
        networthPerAcre: "",
        race: "",
        honor: "",
        name: ""
      }
    
      let provinceProp = document.querySelectorAll(".tablesorter > tbody > tr")[i].childNodes;

      province.acres = provinceProp[7].innerHTML;
      province.networth = provinceProp[9].innerHTML;
      province.networthPerAcre = provinceProp[11].innerHTML
      province.race = provinceProp[5].innerHTML;
      province.honor = provinceProp[13].innerHTML;
      province.name = provinceProp[3].innerText
    
      return province;
    }, i);

    provinces[row.name] = row;
  }
  // console.log(provinces);
  return provinces;
}

async function kingdomProvinceData(page) {
  await delay(10000);
  await page.evaluate(()=> {
    document.querySelectorAll(".tablesorter > tbody > tr").forEach((element, i)=> {
      console.log(element.childNodes[5].innerHTML);
    })
  })
}

async function grabTotal(page, id) {
  //id is passed into the evalate function as selectorId
  return await page.evaluate((selectorId) => {
    return document.querySelectorAll(".two-column-stats > tbody > tr")[
      selectorId
    ].childNodes[3].innerHTML;
  }, id);
}

async function grabDate(page) {
  return await page.evaluate(() => {
    return document.querySelector(".current-date").innerHTML;
  });
}

async function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}



// main();

module.exports = {
  main
};