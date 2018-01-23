const WalletService = {
  login(key,callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/login', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { //Call a function when the state changes.
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here.
        if(callback)callback(JSON.parse(xhr.responseText));
      }
    }
    xhr.send("key=" + key);
  }
};
module.exports = WalletService;
