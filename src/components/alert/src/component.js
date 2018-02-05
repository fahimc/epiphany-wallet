import { EventBus } from '../../../event/event.js';
export default {
  name: 'alert-dialog',
  data() {
    return {
      message: '',
      backgroundClass:'',
      showClass:''
    }
  },
  methods: {
    onShowAlert(data) {
      this.backgroundClass = data.typeClass;
      this.message = data.message;
      this.showClass = 'show';
    },
    onHideAlert(){
      this.showClass = '';
    }
  },
  created() {
    EventBus.$on('showAlert', this.onShowAlert.bind(this));
    EventBus.$on('hideAlert', this.onHideAlert.bind(this));
  }
};
