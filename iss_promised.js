const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(stringIP) {
  return request(`https://freegeoip.app/json/${JSON.parse(stringIP).ip}`);
}

const fetchISSFlyOverTimes = function(coordinates) {
  const { latitude, longitude } = JSON.parse(coordinates);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function() {
  fetchMyIP()
  .then((result) => fetchCoordsByIP(result))
  .then((newResult) => fetchISSFlyOverTimes(newResult))
  .then((newestResult) => console.log(newestResult))
  .catch((error) => console.log("It didn't work: ", error.message));
}

/*
const printPassTimes = function(passesInput) {
  for (const result of passesInput) {
    const duration = Math.floor(result.duration / 60);
    const timeNDay = new Date(0);
    timeNDay.setUTCSeconds(result.risetime);
    passTimesOutput += `You'll next see the ISS on ${timeNDay} for ${duration} minutes.\n`;
  }
  console.log(passTimesOutput);
};
*/

module.exports = { 
  nextISSTimesForMyLocation
};
