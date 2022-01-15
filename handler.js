const axios = require("axios");
const https = require("https");

const findLocationByIpURL = "http://ip-api.com/json/";
const weatherApi =
  process.env.WEATHER_API;

module.exports.weather = async (event) => {
  const ip = event.requestContext.http.sourceIp;
  const url = `${findLocationByIpURL}${ip}`;
  const { data } = await axios(url);

  const promise = new Promise((resolve, reject) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=${weatherApi}&units=metric`;
    https.get(weatherUrl, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      res.on("data", (data) => {
        const response = JSON.parse(data);
        resolve(response);
      });
    });
  });
  return promise;
};
