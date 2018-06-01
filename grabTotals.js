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

async function main() {
  let grabbedData = {
    ourKd: {},
    enemyKd: {},
  };

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("up next: login");
  await login(page);
  console.log("up next: navigate to kd page");
  await navigateToKingdomPage(page);

  await delay(10000);
  console.log("up next: return local totals");
  grabbedData.ourKd["landTotal"] = await grabTotal(page, LAND_SELECTOR_ID);
  grabbedData.ourKd["networthTotal"] = await grabTotal(page, NETWORTH_SELECTOR_ID);
  grabbedData.ourKd["honorTotal"] = await grabTotal(page, HONOR_SELECTOR_ID);
  // grabbedData["currentDate"] = 
  const currentDate = await grabDate(page);

  await navigateTo(page, 6, 9);
  await delay(10000);
  grabbedData.enemyKd["landTotal"] = await grabTotal(page, LAND_SELECTOR_ID);
  grabbedData.enemyKd["networthTotal"] = await grabTotal(page, NETWORTH_SELECTOR_ID);
  grabbedData.enemyKd["honorTotal"] = await grabTotal(page, HONOR_SELECTOR_ID);

  // console.log('grabbed Data', grabbedData);

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
  await delay(10000);
  let table = [];
  for (let i = 0; i < KINGDOM_SIZE; i++) {
    let row = await page.evaluate((i) => {
      return document.querySelectorAll(".tablesorter > tbody > tr")[i]
        .innerHTML;
    }, i);
    table.push(row);
  }
  return table;
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
