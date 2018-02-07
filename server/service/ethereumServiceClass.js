let ethers = require('ethers');
let EthereumModel = require('../model/ethereumModel.js');
let EtherScanAPI = require('etherscan-api');
let EtherScan;
let utils = ethers.utils;
let Wallet;
let TokenABI;
let Web3 = require('web3');
let abiDecoder = require('abi-decoder');
let web3 = new Web3(Web3.currentProvider || 'https://etherscan.io/');
let getJSON = require('get-json');

class EthereumService {
  constructor(network) {
    this.contract = null;
    this.providers = null;
    this.TEST = false;
    this.NETWORK = (!network || network == 'main' ? '' : EthereumModel.NETWORK.TEST);
    this.provider = null;
    this.EPIPHANY_CONTRACT = '';
    this.init();
  }
  init() {
    this.setNetwork();
    abiDecoder.addABI(TokenABI);
    this.initContract();

  }
  getEstimate(privateKey, funcName, params, callback) {
    let wallet = new ethers.Wallet(privateKey);
    wallet.provider = this.provider;
    this.contract = new ethers.Contract(EthereumModel.EPIPHANY_CONTRACT, TokenABI, wallet);
    this.contract.estimate[funcName].apply(null, params).then((data) => {
      let gasEstimate = data;
      this.provider.getGasPrice().then((price) => {
        console.log('price', price.toString());
        console.log('gasEstimate', gasEstimate.toString());
        let gasCostInEther = utils.formatEther(gasEstimate.mul(price));
        this.getBalance(privateKey, (ether) => {
          console.log('gasCostInEther', gasCostInEther);
          console.log('balance', ether);
          if (callback) callback({
            balance: ether,
            gasCostInEther: gasCostInEther,
            balanceAfter: (ether - gasCostInEther),
            status: (ether - gasCostInEther >= 0)
          });
        });

      });

    });
  }
  getBalance(privateKey, callback) {
    let wallet = new ethers.Wallet(privateKey);
    wallet.provider = this.provider;
    wallet.getBalance().then((data) => {
      if (callback) callback(utils.formatEther(data.toString()));
    });
  }
  initContract() {
    this.contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, this.provider);
  }
  setNetwork() {
    this.providers = ethers.providers;
    if (!this.NETWORK) {
      TokenABI = require('../data/eny_abi.json');
      EtherScan = EtherScanAPI.init(EthereumModel.ETHERSCAN_API);
      this.provider = this.providers.getDefaultProvider();
      this.EPIPHANY_CONTRACT = EthereumModel.EPIPHANY_CONTRACT;
    } else {
      console.log(this.NETWORK, 'test network api');
      TokenABI = require('../data/eny_abi_test.json');
      console.log(TokenABI)
      EtherScan = EtherScanAPI.init(EthereumModel.ETHERSCAN_API, this.NETWORK);
      this.provider = new this.providers.EtherscanProvider(this.NETWORK);
      this.EPIPHANY_CONTRACT = EthereumModel.TEST_EPIPHANY_CONTRACT;
    }
    Wallet = ethers.Wallet;
  }
  transfer(privateKey, toAddress, amountInENY, callback) {
    let wallet = new ethers.Wallet(privateKey);
    wallet.provider = this.provider;
    this.contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, wallet);
    this.contract.transfer(toAddress, amountInENY).then((data) => {
      if (callback) callback(data);
    });
  }
  createNewWallet(callback) {
    /*
       let wallet = {
         privateKey: '0xa230e57a47107e5abf2ccf87844d59997177b7e28c6da6aaa6d498ee8610d814',
         provider: null,
         defaultGasLimit: null,
         address: '0x70b212Dc51cCbe75e4E58BAcd17C24A61b1148B0',
         sign: [Function],
         mnemonic: 'trap rare pizza organ impact outside artefact program media sheriff daughter coffee',
         path: 'm/44\'/60\'/0\'/0/0'
       }
      */
    let newWallet = Wallet.createRandom();
    if (callback) callback(newWallet);
  }
  login(key, callback) {
    if (key.substring(0, 1) !== '0x') key = '0x' + key;
    let wallet = new Wallet(key);
    this.contract.balanceOf(wallet.address).then(this.onBalance.bind(this, callback, wallet));

  }
  getTransactionList(account, transaction, callback) {
    EtherScan.account.txlist(transaction).then((data) => {
      if (data.result) {
        let epiphanyCollection = [];
        data.result.forEach((item) => {
          item.data = abiDecoder.decodeMethod(item.input);
          if (!item.data) return;
          item.input = '';

          if (item.data.params[0].value.toLowerCase() === account.toLowerCase()) {
            //
            item.type = 'RECEIVED';
            epiphanyCollection.push(item);
          } else if (item.from.toLowerCase() === account.toLowerCase()) {
            item.type = 'SENT';
            epiphanyCollection.push(item);
          }
        });

        if (callback) callback(epiphanyCollection);
      } else {
        if (callback) callback();
      }
    }).catch((err) => { if (callback) callback() });
  }
  getTransactionListNew(account, transaction, callback) {
    let network = this.NETWORK == EthereumModel.NETWORK.TEST ? 'rinkeby' : 'api';
    getJSON(`http://${network}.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=asc&apikey=${EthereumModel.ETHERSCAN_API}`, (error, response) => {
      if (!error && response.result) {
        let collection = [];
        response.result.forEach((item) => {
          if (item.contractAddress.toUpperCase() === transaction.toUpperCase()) {
            item.data = abiDecoder.decodeMethod(item.input);
            console.log(item.data);
            //if (!item.data) return;
           // item.input = '';
            collection.push(item);
          }
        });
        collection.sort(function(x, y) {
          return x.timeStamp - y.timeStamp;
        });

       // console.log(collection);
      }
    });
  }
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
