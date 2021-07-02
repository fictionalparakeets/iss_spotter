const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('error: ');
    console.log(error);
    return;
  }
  let passTimesOutput = '';
  for (const result of passTimes) {
    const duration = Math.floor(result.duration / 60);
    const timeNDay = new Date(0);
    // console.log(typeof timeNDay);
    timeNDay.setUTCSeconds(result.risetime);
    passTimesOutput += `You'll next see the ISS on ${timeNDay} for ${duration} minutes.\n`;
  }
  console.log(passTimesOutput);
});
