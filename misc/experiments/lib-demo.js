const sha256 = require('js-sha256')
const sha1 = require('js-sha1')

const hashed = sha256('Message to Hash')
console.log('Hashed message:', hashed)

const hashed1 = sha1('Message to Hash')
console.log('sha1 hashed message:', hashed1)
