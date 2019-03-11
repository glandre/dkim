const JSEncrypt = require('node-jsencrypt')
const CryptoJS = require('crypto-js')

console.log('node-jsencrypt experiments...')

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvOSwZOq1/WFJghyQeTjveKOZb
8fCcYiyjCOer4kTMssQMSXcADT5aBrIFaXgdp2103G0N2z4ac0FChM+wxiQnF1u4
f3fw3GAM5N7h21wF3wneTDA1otxoM7AMe4Ke4aznw3yaLoBSjjbx7USAtuvr3lr9
AEc4VlWvLWj+/xbycwIDAQAB
-----END PUBLIC KEY-----`

const text = 'Message to Encrypt'

console.log('>>> experiments:', { privateKey, publicKey, text })

//
// ENCRYPTING
//

const signer = new JSEncrypt()
console.log('>>> after calling constructor:', { signer })
signer.setPublicKey(publicKey)
console.log('>>> after setting private key:', {
  signer,
  SHA256: CryptoJS.SHA256
})
const signature = signer.encrypt(text, CryptoJS.SHA256, 'sha256')
console.log('>>> after signing:', {
  signer,
  SHA256: CryptoJS.SHA256,
  signature
})

//
// DECRYPTING
//

// Verify with the public key...
const verifier = new JSEncrypt()
verifier.setPrivateKey(privateKey)
console.log('>>> verifier:', verifier)
const verified = verifier.decrypt(signature, CryptoJS.SHA256, 'sha256')

// Now a simple check to see if the round-trip worked.
if (verified) {
  console.log('>>> It works!!!')
} else {
  console.log('>>> Something went wrong....')
}
