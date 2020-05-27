require("@babel/polyfill");
const seeder = require('mongoose-seed');

const users = [{
  'name': 'admin',
  'password': 'admin123'
},{
  'name': 'user',
  'password': 'user123'
}]

const data = [{
  'model': 'User',
  'documents': users
}]

// connect mongodb
seeder.connect('mongodb://mongo:27017/events', function() {
  seeder.loadModels([
    '../../models/user'  // load mongoose model
  ]);
  seeder.clearModels(['User'], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});
