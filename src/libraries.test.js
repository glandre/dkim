const sha256 = require('js-sha256')
const sha1 = require('js-sha1')

describe('SHA-256 Library Test', () => {
  it('should calculate the proper SHA-256 hash', () => {
    expect(sha256('')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )
    expect(sha256('Message to Hash')).toBe(
      'f97cb6b4ee27d80b454867c46c641b20cc7c326c79ea8320b046b7c01e920f33'
    )
  })
})

describe('SHA-1 Library Test', () => {
  it('should calculate the proper SHA-1 hash', () => {
    expect(sha1('')).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709')
    expect(sha1('Message to Hash')).toBe(
      'b3b438c3b84574bb4069e0d667a18503f82fedb5'
    )
  })
})
