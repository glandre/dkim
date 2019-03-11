const verify = require('./verify')

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvOSwZOq1/WFJghyQeTjveKOZb
8fCcYiyjCOer4kTMssQMSXcADT5aBrIFaXgdp2103G0N2z4ac0FChM+wxiQnF1u4
f3fw3GAM5N7h21wF3wneTDA1otxoM7AMe4Ke4aznw3yaLoBSjjbx7USAtuvr3lr9
AEc4VlWvLWj+/xbycwIDAQAB
-----END PUBLIC KEY-----`

describe('verify()', () => {
  it('Should return true when signature is valid', () => {
    const verified = verify({
      signatureBase64:
        'WmI5LMKJwpdJwq0owp/DucKNwrTCsBPDnXkdUnIDb8ONRwQPdcKgbzbCuQ/DgQV2w4nCuQUOIw8Hw5pxworDvcKQw7B2csOYw7LDuF8fwpnDglDDhAvDv2XCvE/DusKYwrQWw74RwobCqGnCncO5w4nCqcKVJ2jCjn1Cw4rDngHDh8OHwp3CkkPCkCrDncKTH8OGEgbDknU2TcKZHWvCvcKuPxPDqUjCiMKcw5TCucOjwosrw5LCmi8TXMOgUT/DiQ==',
      text: 'Hello world!',
      encoding: 'utf8',
      algorithm: 'sha1',
      publicKeyPem
    })

    expect(verified).toBe(true)
  })

  it('Should return false when signature is invalid', () => {
    const verified = verify({
      signatureBase64:
        'WmI5LMKJwpdJwq0owp/DucKNwrTCsBPDnXkdUnIDb8ONRwQPdcKgbzbCuQ/DgQV2w4nCuQUOIw8Hw5pxworDvcKQw7B2csOYw7LDuF8fwpnDglDDhAvDv2XCvE/DusKYwrQWw74RwobCqGnCncO5w4nCqcKVJ2jCjn1Cw4rDngHDh8OHwp3CkkPCkCrDncKTH8OGEgbDknU2TcKZHWvCvcKuPxPDqUjCiMKcw5TCucOjwosrw5LCmi8TXMOgUT/DiQ==',
      text: 'Not hello world...',
      encoding: 'utf8',
      algorithm: 'sha1',
      publicKeyPem
    })

    expect(verified).toBe(false)
  })
})
