let ethers = require('ethers');
let EtherScan = require('etherscan-api').init('1B927KSENR1446GUNWKG12KUIXRCMS2181'); //HIDE
let utils = ethers.utils;
let Wallet;
let TokenABI = require('../data/eny_abi.json');
let Web3 = require('web3');
let abiDecoder = require('abi-decoder');
let web3 = new Web3(Web3.currentProvider || 'https://etherscan..io/');
var getJSON = require('get-json');
const EthereumService = {
    contract: null,
    providers: null,
    TEST: true,
    TEST_NETWORK: 'rinkeby',
    NETWORK: '',
    provider: null,
    PORT_NUMBER: 8080,
    ETHERSCAN_API: '1B927KSENR1446GUNWKG12KUIXRCMS2181',
    TEST_EPIPHANY_CONTRACT: '0xb16B425FD68E3a87bfF2226b7092Bd1e00053e9e',
    EPIPHANY_CONTRACT: '0x1b413506FC42E2F04a4E8c57710F850b234D6653', //LIVE
    init() {
      if (this.TEST) {
        this.NETWORK = this.TEST_NETWORK;
        this.EPIPHANY_CONTRACT = this.TEST_EPIPHANY_CONTRACT;
        this.PORT_NUMBER = 3000;
      }
      abiDecoder.addABI(TokenABI);
      this.setNetwork();
      this.initContract();
      this.test();
      //this.createNewWallet();
      //this.getTransactionList('0xeDDf29Fa1fb8ADcbaCF1Ef3691604Bdb65341Ac6',this.EPIPHANY_CONTRACT);
    },
    test() {
        this.getEstimate('0xc876c481add221e551f6420bc1e6be6a3b28004691a279ea8613fc54a031db25','transfer',['0x3A7Bd844d560FBA83a8Ed981860b95c0b22EdDB0', 100],(data)=>{
          console.log(data);
        });
    },
    getEstimate(privateKey,funcName,params, callback) {
        let wallet = new ethers.Wallet(privateKey);
        wallet.provider = this.provider;
        this.contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, wallet);
       // this.contract.estimate.transfer('0x3A7Bd844d560FBA83a8Ed981860b95c0b22EdDB0', 100).then((data) => {
        this.contract.estimate[funcName].apply(null,params).then((data) => {
          //let gasCost = Number(data.toString());
          let gasEstimate = data;
          this.provider.getGasPrice().then((price)=>{
            console.log('price',price.toString());
            console.log('gasEstimate',gasEstimate.toString());
            let gasCostInEther = utils.formatEther(gasEstimate.mul(price));
            this.getBalance(privateKey,(ether)=>{
              console.log('gasCostInEther',gasCostInEther);
              console.log('balance',ether);
              if(callback)callback({
                balance:ether,
                gasCostInEther:gasCostInEther,
                balanceAfter: (ether - gasCostInEther),
                status: (ether - gasCostInEther >= 0)
              });
            });
            
          });
          
        });
      },
      getBalance(privateKey, callback) {
        let wallet = new ethers.Wallet(privateKey);
        wallet.provider = this.provider;
        wallet.getBalance().then((data) => {
          if (callback) callback(utils.formatEther(data.toString()));
        });
      },
      initContract() {
        this.contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, this.provider);
      },
      setNetwork() {
        this.providers = ethers.providers;
        if (!this.NETWORK) {
          this.provider = this.providers.getDefaultProvider();
        } else {
          console.log(this.NETWORK);
          this.provider = new this.providers.EtherscanProvider(this.NETWORK);
        }

        Wallet = ethers.Wallet;
      },
      getSigner(privateKey) {
        let wallet = new ethers.Wallet(privateKey);

        function getAddress() {
          return new Promise(function(resolve, reject) {
            var address = wallet.address;
            resolve(address);
          });
        }

        function sign(transaction) {
          return new Promise(function(resolve, reject) {
            var signedTransaction = wallet.sign(transaction);
            resolve(signedTransaction);
          });
        }

        function estimateGas(transaction) {
          return new Promise((resolve, reject) => {
            resolve(wallet.defaultGasLimit);
          });
        }

        var customSigner = {
          getAddress: getAddress,
          provider: this.provider,
          estimateGas: estimateGas,
          sign: sign
        }

        return customSigner;
      },
      transfer(privateKey, toAddress, amountInENY, callback) {
        let customSigner = this.getSigner(privateKey);
        this.contract = new ethers.Contract(this.EPIPHANY_CONTRACT, TokenABI, customSigner);
        this.contract.transfer(toAddress, amountInENY).then((data) => {
          if (callback) callback(data);
        });
      },
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
      },
      login(key, callback) {
        if (key.substring(0, 1) !== '0x') key = '0x' + key;
        let wallet = new Wallet(key);
        this.contract.balanceOf(wallet.address).then(this.onBalance.bind(this, callback, wallet));

      },
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
      },
      callEtherScan() {
        // getJSON('https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash='+ item.hash +'&apikey=1B927KSENR1446GUNWKG12KUIXRCMS2181',(error,data)=>{console.log(data)});
        // getJSON(`https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=${item.hash}&apikey=${this.ETHERSCAN_API}`,(error,data)=>{console.log(data)});
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
