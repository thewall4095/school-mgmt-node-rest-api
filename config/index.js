const routes = require('./routes/routes');

const config = {
  migrate: true, // -> false deletes the prev db and structure
  routes,
  port: process.env.PORT || '4095',
};

module.exports = config;
