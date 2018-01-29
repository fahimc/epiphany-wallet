import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';
import { EventBus } from '../../../event/event.js';

export default {
  name: 'login',
  data() {
    return {
      privatekey: '',
      newWalletAddress: '',
      newPrivateKey: ''
    }
  },
  methods: {
    login(event) {
      if (this.privatekey) {
        WalletService.login(this.privatekey.substring(2, this.privatekey.length), this.onLogin.bind(this));
      }
    },
    onLogin(event) {
      if (!event.error) {
        Store.privatekey = this.privatekey;
        Store.balance = event.data.balance;
        Store.address = event.data.address;
        this.$router.push('/home');
      } else {
        this.showAlert('Cannot Connect to network. Please try again.');
      }
    },
    onCreateWallet(event) {
      if (!event.error) {
        this.newWalletAddress = event.data.address;
        this.newPrivateKey = event.data.privateKey;
        $('#create-modal').modal('show');
      } else {
        this.showAlert('Cannot Connect to network. Please try again.');
      }
    },
    showAlert(message) {
        EventBus.$emit('showAlert', {
          message: message,
          typeClass: 'alert-danger'
        });
    },
    onCreateClick(){
       WalletService.createNewWallet(this.onCreateWallet.bind(this))
    }
  },
  mounted() {},
  created() {
    $('#create-modal').modal({
      backdrop: false
    });
  }
};
