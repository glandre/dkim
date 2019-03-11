// v= (plain-text; REQUIRED) Version, should be v=1
// a= (plain-text; REQUIRED) The algorithm used to generate signature (e.g a=rsa-sha256)
// b= (base64; REQUIRED) The signature data
// bh (base64; REQUIRED) The hash (see how it is computed on 3.7)
//
// other:
// c= canonicalization
// d= (plain-text; REQUIRED) SDID
// h= (plain-text, but see description; REQUIRED) signed header fields
// i= (dkim-quoted-printable; OPTIONAL) AUID
// l= (plain-text unsigned decimal integer; OPTIONAL, default is entire body) Body Length Count aster canonizalization
// q= queries to fetch public keys
// s= selector
// t= Signature Timestamp
// x= Signature Expiration
// z=

// Example:
// DKIM-Signature: v=1; a=rsa-sha256; d=example.net; s=brisbane;
// c=simple; q=dns/txt; i=@eng.example.net;
// t=1117574938; x=1118006938;
// h=from:to:subject:date;
// z=From:foo@eng.example.net|To:joe@example.com|
//  Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700;
// bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=;
// b=dzdVyOfAKCdLXdJOc9G2q8LoXSlEniSbav+yuU4zGeeruD00lszZVoG4ZHRNiYzR

// NOTICE:
// Assumptions
//
// - signer and verifier should have the private key available
//    (otherwise signer should not sign, and verifiers should ignore, according to RFC6376)

// INSTRUCTIONS:
// 2 hashes need to be generated
//
/*
DKIM-Signature: v=1; a=rsa-sha256; d=example.net; s=brisbane;
c=simple; q=dns/txt; i=@eng.example.net;
t=1117574938; x=1118006938;
h=from:to:subject:date;
z=From:foo@eng.example.net|To:joe@example.com|
  Subject:demo=20run|Date:July=205,=202005=203:44:08=20PM=20-0700;
bh=MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=;
b=dzdVyOfAKCdLXdJOc9G2q8LoXSlEniSbav+yuU4zGeeruD00lszZVoG4ZHRNiYzR
*/
const format = ({
  version,
  algorithm, // e.g.: 'rsa-sha1', 'rsa-sha256'
  signature, // Base64 / REQUIRED
  body, // canonicalized body
  length, // canonicalized body length
  canonicalizationMessage,
  sdid // plain-text / REQUIRED
}) => {
  const v = `v=${version}`
  const a = `a=${algorithm}`
  const b = `b=${signature}`
  const bh = `bh=${body}`
  const l = length != null ? `l=${length}` : ''
  const c =
    canonicalizationMessage != null ? `c=${canonicalizationMessage}` : ''
  const d = `d=${sdid}`
  // ...
}
