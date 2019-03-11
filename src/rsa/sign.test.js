const sign = require('./sign')

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

describe('sign()', () => {
  it('Should return the correct base64 signature', () => {
    const signatureBase64 = sign({
      text: 'Hello world!',
      encoding: 'utf8',
      algorithm: 'sha1',
      privateKeyPem
    })

    expect(signatureBase64).toBe(
      'WmI5LMKJwpdJwq0owp/DucKNwrTCsBPDnXkdUnIDb8ONRwQPdcKgbzbCuQ/DgQV2w4nCuQUOIw8Hw5pxworDvcKQw7B2csOYw7LDuF8fwpnDglDDhAvDv2XCvE/DusKYwrQWw74RwobCqGnCncO5w4nCqcKVJ2jCjn1Cw4rDngHDh8OHwp3CkkPCkCrDncKTH8OGEgbDknU2TcKZHWvCvcKuPxPDqUjCiMKcw5TCucOjwosrw5LCmi8TXMOgUT/DiQ=='
    )
  })
})
