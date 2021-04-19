const crypt = require('crypto');
const util = require('util');

export const randomBytes = util.promisify(crypt.randomBytes)
