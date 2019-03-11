const verificationAlgorithm = require('../rsa/verify')
const {
  getAlgorithm,
  getAlgorithmFunction,
  getDomain,
  getEncoding,
  getHeadersString,
  getPublicKeyPem,
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
// - `header` contains all the headers specified in "h=" tag already
// canonicalized as well and with the order preserved
//
// - `domain` and `selector` are used to compute dataHash (before verifying),
// due to lack of understanding. It is not clear to me if it needs to be
// out of the hash but in the encryption, or all in. Also, by doing so,
// it is possible to use RSA API `verify` method directly.
// Without this assumption, it is not clear to me how would
// the verification process be.
//
// - DKIM-Signature header field is not passed to the Step 2
//
const createVerifier = options => {
  const algorithm = getAlgorithm(options)
  const encoding = getEncoding(options)
  const publicKeyPem = getPublicKeyPem(options)
  const domain = getDomain(options)
  const selector = getSelector(options)

  const hashAlgorithm = getAlgorithmFunction(algorithm)

  const verify = (data, signatureBase64) => {
    if (!data) return null

    const { headers, body } = data
    debug(`Message:\nHeaders: [\n${headers.join('\n')}\n]\nBody:\n${body}`)
    debug(`---\nSignature: ${signatureBase64}\n---`)

    // Step 1: body-hash    =  hash-alg (canon-body, l-param)
    const bodyHash = hashAlgorithm(body)

    debug(`Step 1: bh=${bodyHash}`)

    // Step 2 and 3:
    // data-hash    =  hash-alg (h-headers, D-SIG, body-hash)
    // signature    =  sig-alg (d-domain, selector, data-hash)
    const headersString = getHeadersString(headers)
    dSig = '' // ignorimg DKIM-Signature

    // The verificationAlgorithm is the rsa algorithm that
    // already computes the hash of the text using
    // the hash algorithm passed (i.e., sha1 or sha256)
    // see `rsa/sign.js` file.
    const verified = verificationAlgorithm({
      signatureBase64,
      text: `${domain}${selector}${headersString}${dSig}${bodyHash}`,
      encoding,
      publicKeyPem,
      algorithm
    })

    // Returning corresponding DKIM-Signature Header tag values
    debug(`Step 2 and 3: verified=`, verified)
    return verified
  }

  // public methods
  return { verify }
}

module.exports = createVerifier
