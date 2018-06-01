# Crowdfluence

Crowd driven development

### Run

```
$ npm install
$ PATH=$(npm bin):$PATH ganache-cli -l 10000000 -m "mnemonic"
$ npm run compile-contracts
$ npm run deploy-contracts-local
copy contract address to src/mainContract.js
$ npm start
```

### Deploy

```
$ PATH=$(npm bin):$PATH firebase deploy
```


### Develop

`npm run lint` - run lint
