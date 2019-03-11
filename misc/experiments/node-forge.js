const forge = require('node-forge')
console.log('node-forge experiments...')

const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCvOSwZOq1/WFJghyQeTjveKOZb8fCcYiyjCOer4kTMssQMSXcA
DT5aBrIFaXgdp2103G0N2z4ac0FChM+wxiQnF1u4f3fw3GAM5N7h21wF3wneTDA1
otxoM7AMe4Ke4aznw3yaLoBSjjbx7USAtuvr3lr9AEc4VlWvLWj+/xbycwIDAQAB
AoGBAIhCmXx1GP5ynHzcGsZGaF/2xkyx9D5oSfXustoDdyUHz1UOvC+aHOa9VirH
PdUxofjCgTvJRp4jCpjD1w7MxsclVtDFpfp2bdgLkIm14VG6Iu6ukqY7+OBH5YCq
RcHpenXobubtrzb5EpAxw/T566zpenIWvPoj1CP2Wq9E0boBAkEA4fQLa+Ez4vJF
lFTHQTwOQmjILZyHu2+PoraufwK+FWDR/xrLo6BHsMcctIqKwHWvU2xtdjst6d+d
NOLEN8O4QQJBAMaGKoMrXNlmT9EWzlvISPg1Q+xMaCEYb4SrH6kAppf0PkJg91PZ
z3hDR/0rz9ZuU2wiFJEGG+ZzvZG8wLft3bMCQQDYTnu8m8vDP/FSLdLOZYK1GoBA
AfCChCs6Nq5X0rVL2/NMx0cZbnATEJovT83CrybXsx4bKE4s7TAfF9OGGuzBAkA3
ZdkXIVKXl+VOA38yPYGfQb3igq/MDHWSH+6FypiyboWxID3kODOc66l7DG7C96Zv
1lLG5V2DwWh08qcUrFvhAkAAw63psvRt8D0ymTho+oaDVsRtOXueveymyWTVkwv/
ZMODovuV0ZFGt5SStBeOYWDdtYd09mdju/U4SU92Rtv2
-----END RSA PRIVATE KEY-----`

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvOSwZOq1/WFJghyQeTjveKOZb
8fCcYiyjCOer4kTMssQMSXcADT5aBrIFaXgdp2103G0N2z4ac0FChM+wxiQnF1u4
f3fw3GAM5N7h21wF3wneTDA1otxoM7AMe4Ke4aznw3yaLoBSjjbx7USAtuvr3lr9
AEc4VlWvLWj+/xbycwIDAQAB
-----END PUBLIC KEY-----`

const text = 'Message to Sign'

const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)

//
// SHA-1
//
const experimentWithSha1 = () => {
  // sign data with a private key and output DigestInfo DER-encoded bytes
  // (defaults to RSASSA PKCS#1 v1.5)
  const md = forge.md['sha1'].create()
  md.update(text, 'utf8')
  const signature = privateKey.sign(md)
  const signatureBase64 = Buffer.from(signature, 'utf8').toString('base64')

  console.log('>>> RSA SHA-1 signature base64:', signatureBase64)

  const decodedSignature = Buffer.from(signatureBase64, 'base64').toString(
    'utf8'
  )

  // verify data with a public key
  // (defaults to RSASSA PKCS#1 v1.5)
  const verified = publicKey.verify(md.digest().bytes(), decodedSignature)

  console.log('>>> RSA SHA-1 verified:', verified)
}
experimentWithSha1()

//
// SHA-256
//
const experimentWithSha256 = () => {
  // sign data with a private key and output DigestInfo DER-encoded bytes
  // (defaults to RSASSA PKCS#1 v1.5)
  const md = forge.md.sha256.create()
  md.update(text, 'utf8')
  const signature = privateKey.sign(md)
  const signatureBase64 = Buffer.from(signature, 'utf8').toString('base64')
  console.log('>>> RSA SHA-256 signature base64:', signatureBase64)

  const decodedSignature = Buffer.from(signatureBase64, 'base64').toString(
    'utf8'
  )
  // verify data with a public key
  // (defaults to RSASSA PKCS#1 v1.5)
  const verified = publicKey.verify(md.digest().bytes(), decodedSignature)

  console.log('>>> RSA SHA-256 verified:', verified)
}
experimentWithSha256()
