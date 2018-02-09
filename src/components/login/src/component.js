import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';
import Model from '../../../model/store';
import { EventBus } from '../../../event/event.js';

export default {
  name: 'login',
  data() {
    return {
      privatekey: '',
      newWalletAddress: '',
      newPrivateKey: '',
      network: 'main'
    }
  },
  methods: {
    login(event) {
      if (this.privatekey) {
        this.privatekey = this.privatekey.trim();
        WalletService.login(this.privatekey.substring(2, this.privatekey.length), this.onLogin.bind(this));
      }
    },
    onLogin(event) {
      if (!event.error) {
        Store.privatekey = this.privatekey;
        Model.state.privateKey = this.privatekey;
        Store.balance = event.data.balance;
        Model.state.balance = event.data.balance;
        Store.address = event.data.address;
        Model.state.address = event.data.address;
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
          typeClass: 'danger'
        });
    },
    onCreateClick(){
       WalletService.createNewWallet(this.onCreateWallet.bind(this))
    },
    networkChanged(data){
      console.log('networkChanged',this.network);
      Store.network = this.network;
      Model.state.network = this.network;
    }
  },
  mounted() {},
  created() {
    Model.setNavbarState(false);
    $('#networkDropdown').dropdown();
    $('#create-modal').modal({
      backdrop: false
    });
  }
};
