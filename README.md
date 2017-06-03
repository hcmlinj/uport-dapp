# uPort ÐApp
uPort demo

## Smart Contracts
* Official uPort version: [uport-identity](https://github.com/uport-project/uport-identity) and [uport-registry](https://github.com/uport-project/uport-registry)
* Jamie version: [uport-contracts](https://github.com/hcmlinj/uport-contracts)

## Config
### Default [config.json](https://github.com/hcmlinj/uport-dapp/blob/master/config.json), you should modify to yours.
```js
    "contract": {
        "IdentityFactory": "0x6ef4aa4af375efb4e076f0a79698ed771a8f11b3",
        "UportRegistry": "0xa464ecde6f6835d1f649da8b8b9848e77a14912e"
    },
    "ethereum": {
        "host": "http://127.0.0.1:8545"
    },
    "ipfs": {
        "host": "ipfs.infura.io",
        "port": 5001,
        "protocol": "https"
    }
```

## Requirement
```bash
node -v
v7.0.0
```

## Install
```bash
yarn install
// or npm install
```

## Build
```bash
yarn buildp
// or npm run buildp
```

## Start
```bash
yarn start
// or npm run start
```

## Open
[http://127.0.0.1:3000](http://127.0.0.1:3000)

## Generate JWT RS256 public/private RSA key pair
```bash
./jwt_rs256.sh
```