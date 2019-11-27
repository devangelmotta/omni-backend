const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});


let awsConfig = {
  "region": process.env.REGION,
  "endpoint": process.env.ENDPOINT,
  "accessKeyId": process.env.ACCESS_ID,
  "secretAccessKey": process.env.SECRET_ACCESS_KEY
};
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  region: process.env.REGION,
  awsEndpoint: process.env.ENDPOINT,
  accessId: process.env.ACCESS_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  awsConfig,
};
