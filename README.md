# DKIM

## Getting started

After downloading the source code, run the following command to install the software:

```
npm install
```

## Running Tests

In order to run the tests, run the following command:

```
npm test
```

## Using the command-line:

### How To See an example of signing and verifying email?

```
node index.js example
```

### How To Sign an Email

NOTICE: The considered format is JSON. Refer `input-samples` to see an example.

In order to sign an e-mail, run the following command:

```
node index.js sign input-samples/plain-mail.json rsa-sha256
```

Expected output:

```
XcOpw6XCpBvDo8OPw6PCu1ZPaMKywpZEwrvDkMO9w7ZHDjB3w7PCj8OXw4fCj8KfUcOWdmXDhx/DscOvOcKtcMKKZWkJwpPDg1dRw4oKwqtkw78xwpHCjcKxw4nDswFLwpXCsDTDpMKcAwYtQ8OvWMK+TSbDnsOZw7PCgsOlUEAAH8OzXsOww77Du8O6w4t0w652wrouw6dWA8KUYFYlMTh+w7HCrTnCinlNbEfDuH4rwp3DjVnCqlQ3woPCqno9VA==
```

### How to Verify an Email Signature

NOTICE: The considered format is JSON. Refer `input-samples` to see an example.

In order to verify an e-mail signature, run the following command:

```
node index.js verify input-samples/plain-mail.json rsa-sha256 XcOpw6XCpBvDo8OPw6PCu1ZPaMKywpZEwrvDkMO9w7ZHDjB3w7PCj8OXw4fCj8KfUcOWdmXDhx/DscOvOcKtcMKKZWkJwpPDg1dRw4oKwqtkw78xwpHCjcKxw4nDswFLwpXCsDTDpMKcAwYtQ8OvWMK+TSbDnsOZw7PCgsOlUEAAH8OzXsOww77Du8O6w4t0w652wrouw6dWA8KUYFYlMTh+w7HCrTnCinlNbEfDuH4rwp3DjVnCqlQ3woPCqno9VA==
```

Expected output:

```
Signature is valid!
```

### How to run in DEBUG mode

In order to run in debug mode, add `DKIM_DEBUG=true` environment variable. Example:

```
DKIM_DEBUG=true node index.js sign input-samples/plain-mail.json rsa-sha256
```

### Supported Algorithms:

- `rsa-sha256`
- `rsa-sha1`

### Public and Private Keys:

The keys are located in the files `privateKeyPem.js` and `publicKeyPem.js`

### Project Limitations and Assumptions:

### Assumptions:

- Email Test Files in JSON Format. Example:

```json
{
  "headers": [
    "subject: \"Good news\"",
    "from: bob <bob@tutanota.com>",
    "to: <alice@somewhere.else.com>",
    "date: Thu Mar 07 2019 17:07:00 GMT+0100"
  ],
  "body": "Hi Alice,\nI guess you will not believe it, but I have found the dog. It was hidden where you never would have expected.\nCheers,\nBob"
}
```

- `body` contains the canonicalized body specified in the "c=" tag and
  is already truncated to the length specified in the "l="

- `headers` contains all the headers are the parameters chosen by the
  signer already canonicalized as well and with the order preserved

- _(signature)_ `domain` and `selector` are used to compute dataHash (before signing),
  due to lack of understanding. It is not clear to me if it needs to be
  out of the hash but in the encryption, or all in. Also, by doing so,
  it is possible to use RSA API `sign` method directly.
  Without this assumption, the approach would be: 1) compute dataHash) 2) concatenate domain, selector and dataHash 3) RSA encrypt the aforementioned concatenation

- _(verification)_ `domain` and `selector` are used to compute dataHash (before verifying),
  due to lack of understanding. It is not clear to me if it needs to be
  out of the hash but in the encryption, or all in. Also, by doing so,
  it is possible to use RSA API `verify` method directly.
  Without this assumption, it is not clear to me how would
  the verification process be.

### Limitations:

- DKIM-Signature header field is not passed to the Step 2

## REFERENCES

These are links from pages that were useful during the progress of this project:

- https://github.com/digitalbazaar/forge
- https://github.com/digitalbazaar/forge#rsa
- https://github.com/emn178/js-sha1
- https://www.npmjs.com/package/crypto-js
- https://github.com/ArnaudValensi/node-jsencrypt
- http://travistidwell.com/jsencrypt/
- http://travistidwell.com/jsencrypt/example.html
- https://medium.com/@DannyAziz97/rsa-encryption-with-js-python-7e031cbb66bb

## About the Author

Geraldo Barbosa Landre - https://geraldo.landre.me
