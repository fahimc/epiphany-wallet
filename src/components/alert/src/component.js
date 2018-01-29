import { EventBus } from '../../../event/event.js';
export default {
  name: 'alert-dialog',
  data() {
    return {
      dialoghtml: ''
    }
  },
  methods: {
    onShowAlert(data) {
      let template = `<div class="alert ${data.typeClass} text-white alert-dismissible fade show"  role="alert">
         ${data.message}
         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
         </div>`;
      this.$el.innerHTML = template;
    },
    onHideAlert(){
      this.$el.innerHTML = '';
    }
  },
  created() {
    EventBus.$on('showAlert', this.onShowAlert.bind(this));
    EventBus.$on('hideAlert', this.onHideAlert.bind(this));
  }
};
