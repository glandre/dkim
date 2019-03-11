const createDKIMVerifier = require('./dkim/verifier')
const publicKeyPem = require('./publicKeyPem')

//
// Verification
//
module.exports = (email, signature, algorithm) => {
  const dkimVerifier = createDKIMVerifier({
    domain: 'landre.me',
    selector: 'geraldo',
    algorithm,
    encoding: 'utf8',
    publicKeyPem
  })

  return dkimVerifier.verify(email, signature)
}
