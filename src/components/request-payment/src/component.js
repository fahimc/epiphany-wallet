import Store from '../../../model/model.js';
import {EventBus} from '../../../event/event.js';

export default {
  name: 'request-payment',
  data() {
    return {
      amount: '',
      qrShow:''
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
          typeClass: 'alert-danger'
        });
        return;
      }
      this.qrShow = 'show';
      new QRCode(document.getElementById("qrcode"), {
        text: `${Store.address}__${this.amount}`,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      document.getElementById("qrcode").classList.add('show');
    }
  },
  mounted() {

  }
};
