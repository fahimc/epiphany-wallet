import Store from '../../../model/model.js';
import {EventBus} from '../../../event/event.js';
import Model from '../../../model/store';

export default {
  name: 'request-payment',
  data() {
    return {
      amount: ''
    }
  },
  methods: {
    goBack() {
      console.log('back');
      this.$router.push('/home');
    },
    generate() {
      if(!this.amount) 
      {
        EventBus.$emit('showAlert',{
          message:'please provide the amount',
          typeClass: 'danger'
        });
        return;
      }else{
        Model.state.requestAmount = this.amount;
        this.$router.push('/qr-code-preview');
      }
      
      
    }
  },
  created(){
    Model.state.navTitle = 'request payment';
    Model.setNavbarState(true,false,true);
  },
  mounted() {

  }
};
