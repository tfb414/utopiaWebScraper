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

const HONOR_SELECTOR_ID = 3;
const LAND_SELECTOR_ID = 2;
const NETWORTH_SELECTOR_ID = 1;

async function main() {

  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  await login(page);
  await navigateToKingdomPage(page);
  await kingdomTableRows(page);

  await delay(5000);
  const landTotal = await grabTotal(page, LAND_SELECTOR_ID);
  const networthTotal = await grabTotal(page, NETWORTH_SELECTOR_ID);
  const honorTotal = await grabTotal(page, HONOR_SELECTOR_ID);

  await console.log("Land Total: ", landTotal);
  await console.log("Networth Total: ", networthTotal);
  await console.log("Honor Total: ", honorTotal);

  return {
    landTotal,
    networthTotal,
    honorTotal
  }
}

async function login(page) {
  await page.goto(BASE_URL);
  await delay(5000)
  page.click(LOGIN_BOX);
  await page.keyboard.type(USERNAME);
  await page.click(PASSWORD_BOX);
  await page.keyboard.type(PASSWORD);
  await page.click(LOGIN_BUTTON);
}

async function navigateToKingdomPage(page) {
  console.log("inside navigateToKdPageFunction");
  page.goto(KINGDOM_URL);
  console.log("should be at kd page");
  await page.waitForSelector(KINGDOM_TABLE);
}

async function kingdomTableRows(page) {
  await delay(5000);
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
    return document.querySelectorAll(".two-column-stats > tbody > tr")[selectorId]
      .childNodes[3].textContent;
  }, id);
}

async function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

// main();

module.exports = {
  main
}
