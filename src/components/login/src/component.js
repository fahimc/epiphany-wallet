import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';

export default {
  name: 'login',
  data(){
    return {
    privatekey: ''
    }
  },
  methods: {
    login(event) {
      if(this.privatekey){
          WalletService.login(this.privatekey,this.onLogin.bind(this));
      }
    },
    onLogin(event){
        console.log(event);
        Store.balance = event.data.balance;
        Store.address = event.data.address;
        if(!event.error)
        {
            this.$router.push('/home');
        }
    }
  }
};
