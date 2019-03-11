const forge = require('node-forge')

const sign = ({ algorithm, privateKeyPem, text, encoding }) => {
  // sign data with a private key and output DigestInfo DER-encoded bytes
  // (defaults to RSASSA PKCS#1 v1.5)

  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)

  const md = forge.md[algorithm].create()
  md.update(text, encoding)

  const signature = privateKey.sign(md)

  // return value in base64
  return Buffer.from(signature).toString('base64')
}

// TODO:
// according to DKIM-Quoted-Printable?
// See: Section 2.11
module.exports = sign
