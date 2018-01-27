import Store from '../../../model/model.js';
import { EventBus } from '../../../event/event.js';
export default {
  name: 'app',
  data() {
    return {
      alertMessage: Store.alertMessage,
      alertClass: Store.alertClass,
      alertId: Store.alertId,
      showAlertClass: Store.showAlertClass
    }
  },
  methods: {
    onShowAlert(data) {
      console.log('here', data);
      this.showAlertClass = 'show';
      this.alertMessage = data;
      let template = `<div class="alert ${data.typeClass} text-white alert-dismissible fade show"  role="alert">
    ${data.message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
      let alertBox = document.createElement('DIV');
      alertBox.style.position = 'absolute';
      alertBox.style.top = '0';
      alertBox.style.width = '100vw';
      alertBox.innerHTML = template;
      document.body.appendChild(alertBox);
    }
  },
  created() {
    EventBus.$on('showAlert', this.onShowAlert.bind(this));
    $('#' + this.alertId).on('close.bs.alert', () => {
      // do something…
      this.showAlertClass = '';
    })
  },
};
