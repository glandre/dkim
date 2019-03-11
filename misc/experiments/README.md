# How To Generate RSA Keys

## Private Key

Generate private key using `openssl`

```
openssl genrsa -out rsa_1024_priv.pem 1024
```

Check the key:
```
cat rsa_1024_priv.pem
```

## Generate Public Key

Generate Public Key using `openssl`
```
openssl rsa -pubout -in rsa_1024_priv.pem -out rsa_1024_pub.pem
```

Check the public key:
```
cat rsa_1024_pub.pem
```
