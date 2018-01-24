const WalletService = {
  login(key,callback) {
    this.send( 'http://localhost:3000/login',"key=" + key,callback);
  },
  send(url,params,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
        if(callback)callback(JSON.parse(xhr.responseText));
      }
    }
    xhr.send(params);
  },
  getTransactions(address,callback){
    this.send( 'http://localhost:3000/transactionlist',"address=" + address,callback);
  }
};
module.exports = WalletService;
