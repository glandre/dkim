const sha256 = require('js-sha256')
const sha1 = require('js-sha1')
const CRLF = '\r\n'

module.exports.getAlgorithm = ({ algorithm = null } = {}) => {
  try {
    const [encryption, hash] = algorithm.split('-')
    if (encryption !== 'rsa') {
      throw new Error(encryption + ' encryption method is not recognized')
    }

    if (!['sha1', 'sha256'].includes(hash)) {
      throw new Error(hash + ' hash method is not recognized')
    }

    return hash
  } catch (err) {
    logError(err)
    throw new Error(`The Algorithm ${algorithm} is not supported!`)
  }
}

module.exports.getAlgorithmFunction = algorithm => {
  // this function assumes that the
  // input is already validated
  const availableAlgorithms = {
    sha1,
    sha256
  }

  return availableAlgorithms[algorithm]
}

module.exports.getEncoding = ({ encoding = 'utf8' } = {}) => {
  try {
    const supportedEncoding = ['raw', 'utf8']
    if (!supportedEncoding.includes(encoding)) {
      throw new Error(`Unrecognized ${encoding}`)
    }
    return encoding
  } catch (err) {
    logError(err)
    throw new Error(`Encoding ${encoding} is not supported`)
  }
}

module.exports.getPrivateKeyPem = ({ privateKeyPem } = {}) => {
  if (privateKeyPem) {
    return '' + privateKeyPem
  }

  return new Error(`Private Key PEM is not defined: ${privateKeyPem}`)
}

module.exports.getPublicKeyPem = ({ publicKeyPem } = {}) => {
  if (publicKeyPem) {
    return '' + publicKeyPem
  }

  return new Error(`Public Key PEM is not defined: ${privateKeyPem}`)
}

module.exports.getDomain = ({ domain } = {}) => {
  if (!domain) {
    throw new Error(`Domain is not defined: ${domain}`)
  }
}

module.exports.getSelector = ({ selector } = {}) => {
  if (!selector) {
    throw new Error(`Selector is not defined: ${selector}`)
  }
}

module.exports.getHeadersString = headers => {
  if (!Array.isArray(headers)) {
    throw new Error(`Headers are malformed: ${headers}`)
  }

  return headers.join(CRLF)
}

// the following lines ilustrates a logger system
const logError = err =>
  process.env.DKIM_DEBUG
    ? console.error('[ERROR] Original error:', err)
    : undefined

module.exports.logError = logError

const debug = (...args) =>
  process.env.DKIM_DEBUG ? console.log('[DEBUG]:', ...args) : undefined

module.exports.debug = debug
