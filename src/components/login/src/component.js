import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';

export default {
  name: 'login',
  data() {
    return {
      privatekey: '',
      newWalletAddress:'',
      newPrivateKey:''
    }
  },
  methods: {
    login(event) {
      if (this.privatekey) {

        WalletService.login(this.privatekey.substring(2,this.privatekey.length), this.onLogin.bind(this));
      }
    },
    onLogin(event) {
      console.log(event);
      Store.balance = event.data.balance;
      Store.address = event.data.address;
      if (!event.error) {
        this.$router.push('/home');
      }
    },
    onCreateWallet(event){
     // $('#create-modal').modal('toggle');
     this.newWalletAddress = event.data.address;
     this.newPrivateKey = event.data.privateKey;
    }
  },
  mounted() {
  },
  created() {
     $('#create-modal').modal({
      backdrop:false
     });
     console.log(WalletService)
     WalletService.createNewWallet(this.onCreateWallet.bind(this))
  }
};
