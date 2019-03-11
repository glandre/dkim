const JSEncrypt = require('node-jsencrypt')

console.log(JSEncrypt)

const encryptor = new JSEncrypt()
encryptor.setPublicKey('My Public Key')
const encrypted = encryptor.encrypt('My Text')
console.log('Encrypted:', encrypted)

const decrypted = encryptor.decrypt()
console.log('Decrypted:', decrypted)
