import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';
import {EventBus} from '../../../event/event.js';

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
      console.log(event);
      if (!event.error) {
      Store.balance = event.data.balance;
      Store.address = event.data.address;
        this.$router.push('/home');
      } else {
        Store.alertMessage = 'Cannot Connect to network. Please try again.';
        EventBus.$emit('showAlert',{
          message: Store.alertMessage,
          typeClass:'alert-danger'
        });
      }
    },
    onCreateWallet(event) {
      // $('#create-modal').modal('toggle');
      this.newWalletAddress = event.data.address;
      this.newPrivateKey = event.data.privateKey;
    }
  },
  mounted() {},
  created() {
    $('#create-modal').modal({
      backdrop: false
    });
    $('#create-modal').on('show.bs.modal', (e) => {
      WalletService.createNewWallet(this.onCreateWallet.bind(this))
      // do something...
    });

  }
};
