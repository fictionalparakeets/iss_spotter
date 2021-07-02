const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      return callback(Error(msg), null);
    }
    const resultObject = JSON.parse(body);
    const stringIP = resultObject.ip;
    callback(null, stringIP);
  });
};

const fetchMyGeo = function(stringIP, callback) {
  request(`https://freegeoip.app/json/${stringIP}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching GEO latAndLong. Response ${body}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const passTimes = function(geoObject, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${geoObject.latitude}&lon=${geoObject.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching ISS pass times. Response ${body}`;
      return callback(Error(msg), null);
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ipString) => {
    if (error) {
      return callback(error, null);
    }
    fetchMyGeo(ipString, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      passTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchMyGeo,
  passTimes,
  nextISSTimesForMyLocation
};
