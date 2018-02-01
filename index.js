var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const EthereumService = require('./server/service/ethereumservice.js');
const EthereumServiceClass = require('./server/service/ethereumServiceClass.js');

const Server = {
  port:8080,
  DEV:true,
  init() {
    if(this.DEV)this.port = 3000;
    EthereumService.init();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    this.setRoutes();
    this.start();
  },
  setRoutes() {
    app.use(this.onBeforeRequest.bind(this));
    app.use('/', express.static('dist'));
    app.post('/login', this.onLogin.bind(this));
    app.post('/create', this.createWallet.bind(this));
    app.post('/transactionlist', this.onTransactionList.bind(this));
    app.post('/estimateTransfer', this.onEstimateTransfer.bind(this));
    app.post('/sendTransfer', this.onSendTransfer.bind(this));
  },
  onSendTransfer(req, res) {
    let response = this.getResponseObject();
    //privateKey,funcName,params, callback
    if (req.body.privateKey && req.body.toAddress && req.body.amount) {
      let ethereumService = new EthereumServiceClass(req.body.network);
     ethereumService.getEstimate(req.body.privateKey,'transfer',[req.body.toAddress,req.body.amount],(data) => {
     
      if(data.status)
      {
        ethereumService.transfer(req.body.privateKey, req.body.toAddress , req.body.amount, (data)=>{
           response.data = data;
           res.json(response);
        });

      }
     
    });
   }else{
      response.error = 'invalid info';
      response.errorCode = 1;
      res.json(response);
   }
  },
  onEstimateTransfer(req, res) {
    let response = this.getResponseObject();
    //privateKey,funcName,params, callback
    if (req.body.privateKey && req.body.toAddress && req.body.amount) {
      let ethereumService = new EthereumServiceClass(req.body.network);
     ethereumService.getEstimate(req.body.privateKey,'transfer',[req.body.toAddress,req.body.amount],(data) => {
      response.data = data;
      res.json(response);
    });
   }else{
      response.error = 'invalid info';
      response.errorCode = 1;
      res.json(response);
   }
  },
  setNetworkSetting(data,ethereumService){
    if(data.network){
      console.log('setNetworkSetting',data.network)
      ethereumService.setNetwork(data.network);
    }
  },
  createWallet(req, res) {
    let response = this.getResponseObject();
     let ethereumService = new EthereumServiceClass(req.body.network);
    ethereumService.createNewWallet((wallet) => {
      response.data = wallet;
      res.json(response);
    });
  },
  onBeforeRequest(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  onTransactionList(req, res) {
    let response = this.getResponseObject();
    if (req.body.address) {
       let ethereumService = new EthereumServiceClass(req.body.network);
      ethereumService.getTransactionList(req.body.address, ethereumService.EPIPHANY_CONTRACT, (data) => {
        response.data = data;
        res.json(response);
      });
    } else {
      response.error = 'invalid addresss';
      response.errorCode = 1;
      res.json(response);
    }

  },
  onLogin(req, res) {
    let response = this.getResponseObject();
    if (req.body.key) {
       let ethereumService = new EthereumServiceClass(req.body.network);
      ethereumService.login(req.body.key, (data) => {
        response.data = data;
        res.json(response);
      });
    } else {
      response.error = 'invalid key';
      response.errorCode = 1;
      res.json(response);
    }
  },
  getResponseObject() {
    return {
      error: '',
      errorCode: null,
      data: null
    };
  },
  start() {
    //app.listen(3000, () => console.log('Example app listening on port 3000!'));
    app.listen(this.port , () => console.log('Example app listening on port ' + this.port ));
  }
};
Server.init();
