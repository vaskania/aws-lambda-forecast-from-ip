const axios = require("axios");

const findLocationByIpURL = "http://ip-api.com/json/";
const weatherApi =
  process.env.WEATHER_API;

module.exports.weather = async (event) => {
  const ip = event.requestContext.http.sourceIp;
  const url = `${findLocationByIpURL}${ip}`;
  const { data } = await axios(url);

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=${weatherApi}&units=metric`;
  const response = await axios(weatherUrl);

  return response.data;
};
