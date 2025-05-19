const crypto = require('crypto');

module.exports = {
  generateTokenCrypto: () => crypto.randomBytes(32).toString('hex'),
};
