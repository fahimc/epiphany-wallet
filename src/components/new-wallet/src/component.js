import Model from '../../../model/store';
import WalletService from '../../../service/walletservice.js';
import { EventBus } from '../../../event/event.js';

export default {
  name: 'new-wallet',
  methods: {
    generateClicked() {
      Model.showLoader(true);
      //WalletService.createNewWallet(this.onCreateWallet.bind(this));
      setTimeout(this.onCreateWallet.bind(this,{
      	error:1,
      	data:{
      		address:'0xde43grf74gssd734hger7634',
      		privateKey:'sjhdjshd373463746734jkherjher783434jh'
      	}
      }),1000);
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
    },
    showAlert(message) {
      EventBus.$emit('showAlert', {
        message: message,
        typeClass: 'alert-danger'
      });
    },
  },
  created() {
    Model.state.navTitle = 'new wallet';
    Model.setNavbarState(true, false, true);
  }
};
