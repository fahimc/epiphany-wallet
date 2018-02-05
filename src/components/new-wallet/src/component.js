import Model from '../../../model/store';
import WalletService from '../../../service/walletservice.js';
import { EventBus } from '../../../event/event.js';

export default {
  name: 'new-wallet',
  data() {
    return {
      generateClass: 'show',
      successClass: '',
      newWalletAddress: '',
      newPrivateKey: '',
    }
  },
  methods: {
    generateClicked() {
      this.generateClass = '';
      Model.showLoader(true);
      WalletService.createNewWallet(this.onCreateWallet.bind(this));

    },
    test() {
      setTimeout(this.onCreateWallet.bind(this, {
        error:1,
        data: {
          address: '0xde43grf74gssd734hger7634sdjshdjshdjsjd',
          privateKey: 'sjhdjshd373463746734jkherjher783434jhsdjsdhs7yuyusd'
        }
      }), 1000);
    },
    onCreateWallet(event) {
      Model.showLoader(false);
      if (!event.error) {
        this.newWalletAddress = event.data.address;
        this.newPrivateKey = event.data.privateKey;
        $('#create-modal').modal('show');
      } else {
        this.showAlert('Cannot Connect to network. Please try again.');
      }
      this.successClass = 'show';
    },
    showAlert(message) {
      EventBus.$emit('showAlert', {
        message: message,
        typeClass: 'danger'
      });
    },
  },
  created() {
    Model.state.navTitle = 'new wallet';
    Model.setNavbarState(true, false, true);
  }
};
