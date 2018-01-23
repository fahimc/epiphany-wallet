let ethers = require('ethers');
let utils = ethers.utils;
let Wallet;
let TokenABI = require('../data/eny_abi.json');

const EthereumService = {
  providers: null,
  NETWORK: 'rinkeby',
  provider: null,
  EPIPHANY_CONTRACT:'0xb16B425FD68E3a87bfF2226b7092Bd1e00053e9e',
  init() {
    this.setNetwork();
  },
  setNetwork() {
    this.providers = ethers.providers;
    this.provider = new this.providers.EtherscanProvider(this.NETWORK);
    Wallet = ethers.Wallet;
  },
  login(key, callback) {
    if(key.substring(0,1) !== '0x') key = '0x'+key;
    let wallet = new Wallet(key);
    let contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, this.provider);
    contract.balanceOf(wallet.address).then(this.onBalance.bind(this,callback,wallet));

  },
  onBalance(callback,wallet,data){
    if(!data[0])callback({
      error:'server error. Please try again'
    });
      callback({
        balance: data[0].toString(),
        address: wallet.address
      });
  }
};

module.exports = EthereumService;
