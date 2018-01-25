var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const EthereumService = require('./server/service/ethereumservice.js');

const Server = {
  init() {
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
    app.post('/transactionlist', this.onTransactionList.bind(this));
  },
  onBeforeRequest(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  },
  onTransactionList(req, res) {
    let response = this.getResponseObject();
    if (req.body.address) {
      EthereumService.getTransactionList(req.body.address, EthereumService.EPIPHANY_CONTRACT,(data) => {
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
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
  }
};
Server.init();
