import Store from '../model/model.js';

const WalletService = {
  //SERVICE_URL:'http://localhost:3000',
  SERVICE_URL: 'http://198.58.105.111:8080', //LIVE
  login(key, callback) {
    this.send(this.SERVICE_URL + '/login', "key=" + key + `&network=${Store.network}`, callback);
  },
  send(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
        if (callback) callback(JSON.parse(xhr.responseText));
      }else if(xhr.readyState == XMLHttpRequest.DONE){
        if (callback) callback({
          error:1
        });
      }
    }
    xhr.send(params);
  },
  getTransactions(address, callback) {
    this.send(this.SERVICE_URL + '/transactionlist', "address=" + address + `&network=${Store.network}`, callback);
  },
  createNewWallet(callback) {
    this.send(this.SERVICE_URL + '/create', null, callback);
  },
  estimateTransfer(privateKey,to,amount,callback){
    this.send(this.SERVICE_URL + '/estimateTransfer', `privateKey=${privateKey}&toAddress=${to}&amount=${amount}&network=${Store.network}` , callback);
  },
  sendTransfer(privateKey,to,amount,callback){
    this.send(this.SERVICE_URL + '/sendTransfer', `privateKey=${privateKey}&toAddress=${to}&amount=${amount}&network=${Store.network}` , callback);
  }
};
export default WalletService;
