import { EventBus } from '../event/event.js';

const Util = {
  currencyFormatted(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  },
  convertCurrencyValue(amount) {
    let decimal = 6;
    return amount / Math.pow(10, decimal);
  },
  showAlert(message) {
    EventBus.$emit('showAlert', {
      message: message,
      typeClass: 'danger'
    });
  },
  hideAlert() {
    EventBus.$emit('hideAlert');
  }
};

export default Util;
