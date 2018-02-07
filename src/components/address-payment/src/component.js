import Model from '../../../model/store';
import Util from '../../../service/util.js';
import WalletService from '../../../service/walletservice.js';
export default {
  name: 'address-payment',
  data() {
    return {
      toAddress: '',
      amount: '',
      model:Model.state
    }
  },
  methods: {
    checkCost() {
      if (!this.toAddress || !this.amount) {
        Util.showAlert('Please fill in all details');
        Model.showLoader(false);
      } else {
        Util.hideAlert();
        Model.showLoader(true);
        WalletService.estimateTransfer(Model.state.privateKey, this.toAddress, this.amount, this.onEstimation.bind(this));
      }
    },
    onEstimation(event) {
      console.log('onEstimation', event);
      if (event.error) {
        Util.showAlert('Something went wrong. Please try again.');
        Model.showLoader(false);
        return;
      }
      Model.state.newTransactionData  = event.data;
      Model.state.newTransactionData.toAddress = this.toAddress;
      Model.state.newTransactionData.amount = this.amount;

      this.$router.push('/verify-transaction');
    }
  },
  created() {
  	Model.state.newTransactionData = null;
    Model.state.navTitle = 'address payment';
    Model.setNavbarState(true, false, true);
  }
};
