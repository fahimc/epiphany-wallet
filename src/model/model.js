var store = {
  IS_DEVELOPMENT_MODE:false,
  network: '',
  address: '',
  balance: 999999999999,
  privatekey: '',
  alertMessage: '',
  alertClass: 'alert-danger',
  alertId: 'main-alert',
  showAlertClass: '',
  navbarClass: '',
  navTitle: 'overview',
  currentPriceUSD:0.5,
  //LIVE_SERVICE_URL:'http://198.58.105.111:8080',
  LIVE_SERVICE_URL:'//eny4.co.uk',
  LOCAL_SERVICE_URL:'http://localhost:3000',
  SERVICE_URL(){
  	return this.IS_DEVELOPMENT_MODE ? this.LOCAL_SERVICE_URL : this.LIVE_SERVICE_URL;
  }
}

module.exports = store;
