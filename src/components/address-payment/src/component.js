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
      } else {
        Util.hideAlert();
        Model.showLoader(true);
        console.log(Model.state.privatekey, this.toAddress, this.amount);
        WalletService.estimateTransfer(Model.state.privatekey, this.toAddress, this.amount, this.onEstimation.bind(this));
      }
    },
    onEstimation(event) {
      console.log('onEstimation', event);
      if (event.error) {
        Util.showAlert('Something went wrong. Please try again.');
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
