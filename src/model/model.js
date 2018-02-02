var store = {
  IS_DEVELOPMENT_MODE:false,
  network: '',
  address: '',
  balance: 0,
  privatekey: '',
  alertMessage: '',
  alertClass: 'alert-danger',
  alertId: 'main-alert',
  showAlertClass: '',
  LIVE_SERVICE_URL:'http://198.58.105.111:8080',
  LOCAL_SERVICE_URL:'http://localhost:3000',
  SERVICE_URL(){
  	return this.IS_DEVELOPMENT_MODE ? this.LOCAL_SERVICE_URL : this.LIVE_SERVICE_URL;
  }
}

module.exports = store;
