let ethers = require('ethers');
let EtherScan = require('etherscan-api').init('1B927KSENR1446GUNWKG12KUIXRCMS2181'); //HIDE
let utils = ethers.utils;
let Wallet;
let TokenABI = require('../data/eny_abi.json');
let Web3 = require('web3');
let abiDecoder = require('abi-decoder');
let web3 = new Web3(Web3.currentProvider);
const EthereumService = {
  providers: null,
  //NETWORK: 'rinkeby',
  NETWORK: '',
  provider: null,
  // EPIPHANY_CONTRACT: '0xb16B425FD68E3a87bfF2226b7092Bd1e00053e9e',
  EPIPHANY_CONTRACT: '0x1b413506FC42E2F04a4E8c57710F850b234D6653', //LIVE
  init() {
    abiDecoder.addABI(TokenABI);
    this.setNetwork();
  },
  setNetwork() {
    this.providers = ethers.providers;
    if (!this.NETWORK) {
      this.provider = this.providers.getDefaultProvider();
    } else {
      this.provider = new this.providers.EtherscanProvider(this.NETWORK);
    }

    Wallet = ethers.Wallet;
  },
  login(key, callback) {
    if (key.substring(0, 1) !== '0x') key = '0x' + key;
    let wallet = new Wallet(key);
    let contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, this.provider);
    contract.balanceOf(wallet.address).then(this.onBalance.bind(this, callback, wallet));

  },
  getTransactionList(account,transaction, callback) {
    EtherScan.account.txlist(transaction).then((data) => {
      if (data.result) {
        let epiphanyCollection = [];
        data.result.forEach((item) => {
          item.data = abiDecoder.decodeMethod(item.input);
          if(!item.data)return;
          item.input = '';
          console.log(item.to,item.from,account,'------');
          console.log(item.data.params[1].value,'------');
          //if (item.to.toLowerCase() === account.toLowerCase()) {
          if (item.data.params[0].value.toLowerCase() === account.toLowerCase()) {
            item.type = 'RECEIVED';
            epiphanyCollection.push(item);
          } else if (item.from.toLowerCase() === account.toLowerCase()) {
            item.type = 'SENT';
            epiphanyCollection.push(item);
          }
        });

        if (callback) callback(epiphanyCollection);
      }else{
        if (callback) callback();
      }
    }).catch((err) => { if (callback) callback()});
  },
  toAscii(hex) {
    var str = '',
      i = 0,
      l = hex.length;
    if (hex.substring(0, 2) === '0x') {
      i = 2;
    }
    for (; i < l; i += 2) {
      var code = parseInt(hex.substr(i, 2), 16);
      if (code === 0) continue; // this is added
      str += String.fromCharCode(code);
    }
    return str;
  },
  onBalance(callback, wallet, data) {
    if (!data[0]) callback({
      error: 'server error. Please try again'
    });
    callback({
      balance: data[0].toString(),
      address: wallet.address
    });
  }
};

module.exports = EthereumService;
