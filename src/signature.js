const createDKIMSigner = require('./dkim/signer')
const privateKeyPem = require('./privateKeyPem')

//
// Signature
//
module.exports = (email, algorithm) => {
  const dkimSigner = createDKIMSigner({
    domain: 'landre.me',
    selector: 'geraldo',
    algorithm,
    encoding: 'utf8',
    privateKeyPem
  })

  const signature = dkimSigner.sign(email)
  return signature
}
