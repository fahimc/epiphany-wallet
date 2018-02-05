import alertDialog from '../../alert/alert.vue';
import navbar from '../../navbar/navbar.vue';
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
  components:{
    alertDialog,
    navbar
  },
  methods: {

  },
  
};
