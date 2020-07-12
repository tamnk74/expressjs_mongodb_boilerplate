const schedule = require('node-schedule');

// will run every minutes
schedule.scheduleJob('*/1 * * * *', async () => {
  console.log(`Current time ${new Date().toTimeString()}`);
});
