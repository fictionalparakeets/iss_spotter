const { nextISSTimesForMyLocation } = require('./iss_promised');

let passTimesOutput = '';

nextISSTimesForMyLocation()
// .then((newestResult) => console.log(newestResult));
// .catch((error) => console.log("It didn't work: ", error.message));
