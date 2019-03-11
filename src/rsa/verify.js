const forge = require('node-forge')

const verify = ({
  text,
  encoding,
  signatureBase64,
  algorithm,
  publicKeyPem
}) => {
  // console.log('>>>> rsa/verify\n', {
  //   text,
  //   encoding,
  //   signatureBase64,
  //   algorithm,
  //   publicKeyPem
  // })
  // sign data with a private key and output DigestInfo DER-encoded bytes
  // (defaults to RSASSA PKCS#1 v1.5)
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
  const md = forge.md[algorithm].create()
  md.update(text, encoding)

  const signature = Buffer.from(signatureBase64, 'base64').toString(encoding)

  // verify data with a public key
  // (defaults to RSASSA PKCS#1 v1.5)
  const verified = publicKey.verify(md.digest().bytes(), signature)

  return verified
}

module.exports = verify
