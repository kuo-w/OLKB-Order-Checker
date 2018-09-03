/* ENVIRONMENT VARIABLES
Set these in Cloud Function environment variables
*/

// Twilio auth keys
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Your OLKB order number
const ORDER_NUMBER = process.env.ORDER_NUMBER;

// Phone numbers
// Expected format is +<country code><phone number>
// e.g. +12223334444
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;

// Libraries
const client = require("twilio")(accountSid, authToken);
const request = require("request-promise");
const cheerio = require("cheerio");

// Constants
const ORDER_PAGE_URL = "https://orders.olkb.com/";

const getHtml = url => {
  return new Promise((resolve, reject) => {
    request(url).then(html => {
      resolve(html);
    });
  });
};

const findQueueNumber = orderPageHtml => {
  const $ = cheerio.load(orderPageHtml);
  let queue_num =
    $("ol")
      .find(`li:contains(${parseInt(ORDER_NUMBER)})`)
      .index() + 1;
  return queue_num;
};

const sendSms = queueNumber => {
  client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      body: `Your OLKB queue number is ${queueNumber}`,
      to: RECIPIENT_PHONE_NUMBER
    })
    .then(message => console.log(message.sid))
    .done();
};

exports.checkOrder = (req, res) => {
  getHtml(ORDER_PAGE_URL).then(html => {
    const queueNumber = findQueueNumber(html);
    sendSms(queueNumber);
    res.send(`${queueNumber}`);
  });
};
