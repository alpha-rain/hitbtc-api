//http://api.hitbtc.com
//https://hitbtc.com/api#symbols
const { promisify } = require(`util`);
const requestCallback = require("request");
let request = promisify(requestCallback);

const tinyRequestCallback = require("tinyreq");
let tinyRequest = promisify(tinyRequestCallback);
const cheerio = require("cheerio");

let SHA256 = require("crypto-js/hmac-sha512");

let base = `http://api.hitbtc.com/api/1`;
let url = 'https://hitbtc.com/HVN-to-ETH'; //'https://hitbtc.com/exchange';

let apikey = '';

var exports = module.exports = {};
//     getHtmlCoins
// };

//----------my sitecoin API----------
exports.getHtmlCoins = getHtmlCoins;
//----------my sitecoin API----------

//https://hitbtc.com/api#marketrestful
//----------Public RESTful API----------
exports.getTimestamp = restAPI(`${base}/public/time`);
exports.getSymbols = restAPI(`${base}/public/symbols`);
exports.getSymbol = async function(ticker) { return await restAPI(`${base}/public/${ticker}/ticker`); };
exports.getTicker = restAPI(`${base}/public/ticker`);
exports.getOrderbook = async function(ticker) { return await restAPI(`${base}/public/${ticker}/orderbook`); };
exports.getTrades = async function(ticker) { return await restAPI(`${base}/public/${ticker}/trades`); };
exports.getTradesRecent = async function(ticker) { return await restAPI(`${base}/public/${ticker}/trades/recent`); };
//----------Public RESTful API----------

//----------Trading RESTful API----------


//----------Payment RESTful API----------

//----------Payment RESTful API----------

//encrypted api
async function restAPIencrypt(url, options = {}) {
    let nomce = new Date().getTime();
    let uri = url + '?';
    let message = uri + postData;
    let signature = lower_case(hex(hmac_sha512(message, secret_key)))

    let reqOptions = { url: url, json: true };
    //let response = yield requestKoa(reqOptions);
    let response;
    try {
        response = await request(reqOptions);
        return response.body;
    } catch (err) {
        console.dir(`error: ${err.message}`);
        return null;
    }
}

//my api part
async function getHtmlCoins() {
    // 1. Create the request
    try {
        let body = await tinyRequest(url);

        let $ = cheerio.load(body),
            pageData = {};

        let data = $('div').filter('#configurator').attr('onclick'); //#configurator

        data = data.replace('return', '');

        let obj = eval('(' + data + ')');
        return obj;
    } catch (err) {
        console.log(err.message);
    }
}

//Market data RESTful API
async function restAPI(url, options = {}) {
    let reqOptions = { url: url, json: true };
    //let response = yield requestKoa(reqOptions);
    let response;
    try {
        response = await request(reqOptions);
        return response.body;
    } catch (err) {
        console.dir(`error: ${err.message}`);
        return null;
    }
}