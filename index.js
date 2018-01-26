var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const EthereumService = require('./server/service/ethereumservice.js');

const Server = {
  port:8080,
  init() {
    EthereumService.init();
    this.port = EthereumService.PORT_NUMBER;
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
  },
  createWallet(req, res) {
    let response = this.getResponseObject();
    EthereumService.createNewWallet((wallet) => {
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
      EthereumService.getTransactionList(req.body.address, EthereumService.EPIPHANY_CONTRACT, (data) => {
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
      EthereumService.login(req.body.key, (data) => {
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
