const run = async (action, emailFile, algorithm, signature) => {
  try {
    const parseEmail = require('./src/parseEmail')
    const email = await parseEmail(emailFile)
    switch (action) {
      case 'sign': {
        const sign = require('./src/signature')
        const result = await sign(email, algorithm)
        console.log(result)
        break
      }
      case 'verify': {
        const verify = require('./src/verification')
        const valid = await verify(email, signature, algorithm)
        console.log(valid ? 'Signature is valid!' : 'Signature is NOT valid...')
        break
      }
      case 'example': {
        require('./src')
      }
      default:
        console.log(
          'Possible commands are: \n' +
            '- sign [email] : Generates a DKIM signature for the passed email.\n' +
            '- verify [email] [signature] : Verifies if the DKIM signature is valid.\n'
        )
    }
  } catch (err) {
    console.log(err.message)
  }
}

// e.g.: node dkim sign dkim/input-samples/plain-mail.txt rsa-sha256
run(process.argv[2], process.argv[3], process.argv[4], process.argv[5])
