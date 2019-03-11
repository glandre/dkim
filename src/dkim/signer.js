const signatureAlgorithm = require('../rsa/sign')
const {
  getAlgorithm,
  getAlgorithmFunction,
  getDomain,
  getEncoding,
  getHeadersString,
  getPrivateKeyPem,
  getSelector,
  debug,
  logError
} = require('./helpers')

//
// Assumptions:
//
// - `body` contains the canonicalized body specified in the "c=" tag and
// is already truncated to the length specified in the "l="
//
// - `headers` contains all the headers are the parameters chosen by the
// signer already canonicalized as well and with the order preserved
//
// - `domain` and `selector` are used to compute dataHash (before signing),
// due to lack of understanding. It is not clear to me if it needs to be
// out of the hash but in the encryption, or all in. Also, by doing so,
// it is possible to use RSA API `sign` method directly.
// Without this assumption, the approach would be:
//     1) compute dataHash)
//     2) concatenate domain, selector and dataHash
//     3) RSA encrypt the aforementioned concatenation
//
// - DKIM-Signature header field is not passed to the Step 2
//
const createSigner = options => {
  const algorithm = getAlgorithm(options)
  const encoding = getEncoding(options)
  const privateKeyPem = getPrivateKeyPem(options)
  const domain = getDomain(options)
  const selector = getSelector(options)

  const hashAlgorithm = getAlgorithmFunction(algorithm)

  const sign = data => {
    if (!data) return null

    const { headers, body } = data
    debug(`Message:\nHeaders: [\n${headers.join('\n')}\n]\nBody:\n${body}`)

    // Step 1: body-hash    =  hash-alg (canon-body, l-param)
    const bodyHash = hashAlgorithm(body)

    debug(`Step 1: bh=${bodyHash}`)

    // Step 2 and 3:
    // data-hash    =  hash-alg (h-headers, D-SIG, body-hash)
    // signature    =  sig-alg (d-domain, selector, data-hash)
    const headersString = getHeadersString(headers)
    dSig = '' // ignorimg DKIM-Signature

    // The signatureAlgorithm is the rsa algorithm that
    // already computes the hash of the text using
    // the hash algorithm passed (i.e., sha1 or sha256)
    // see `rsa/sign.js` file.
    const signature = signatureAlgorithm({
      algorithm,
      privateKeyPem,
      text: `${domain}${selector}${headersString}${dSig}${bodyHash}`,
      encoding
    })

    // Returning corresponding DKIM-Signature Header tag values
    debug(`Step 2 and 3: signature=`, signature)
    return signature
  }

  // public methods
  return { sign }
}

module.exports = createSigner
