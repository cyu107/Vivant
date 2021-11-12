const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  module.exports = require('./store.dev');
} else {
  module.exports = require('./store.prod');
}
