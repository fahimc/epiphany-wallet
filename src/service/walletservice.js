const WalletService = {
  //SERVICE_URL:'http://localhost:3000',
 SERVICE_URL: 'http://198.58.105.111:8080', //LIVE
  login(key, callback) {
    this.send(this.SERVICE_URL + '/login', "key=" + key, callback);
  },
  send(url, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
        if (callback) callback(JSON.parse(xhr.responseText));
      }
    }
    xhr.send(params);
  },
  getTransactions(address, callback) {
    this.send(this.SERVICE_URL + '/transactionlist', "address=" + address, callback);
  },
  createNewWallet(callback) {
    this.send(this.SERVICE_URL + '/create', null, callback);
  }
};
module.exports = WalletService;
