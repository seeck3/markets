const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const reg = new RegExp('\\.js$', 'i')
const modelsPath = path.resolve('server/models');
// const modelsPath = path.join(__dirname, '../models');

mongoose.connect('mongodb://admin:ehdcks85@ds213199.mlab.com:13199/markets', {
  useNewUrlParser: true,
});
// mongoose.connect('mongodb://localhost:27017/bicyclemarketplace', {
//   useNewUrlParser: true,
// });


mongoose.connection.on('connected', () => console.log('MongDB connected'));

fs.readdirSync(modelsPath).forEach(file => {
  if (reg.test(file)) {
    require(path.join(modelsPath, file));
  }
});
