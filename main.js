const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const ORDER_NUMBER = process.env.ORDER_NUMBER;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);
const request = require('request-promise');
const cheerio = require('cheerio');
const URL = "https://orders.olkb.com/";

const getOrdersPage = () => {
  return new Promise((resolve, reject) => {
    request(URL).then(html => {
      resolve(html);
    })
  })
};

const findQueueNumber = html => {
  const $ = cheerio.load(html)
  let queue_num = $("ol").find(`li:contains(${parseInt(ORDER_NUMBER)})`).index() + 1;
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
}

exports.checkOrder = (req, res) => {
  getOrdersPage()
    .then(html => {
      const queueNumber = findQueueNumber(html)
      sendSms(queueNumber)
      res.send(`${queueNumber}`);
    })
};
