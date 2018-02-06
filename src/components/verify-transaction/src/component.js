import Model from '../../../model/store';
export default {
  name: 'verify-transaction',
  data() {
    return {
      toAddress: '',
      amount: '',
      currentBalance: '',
      transactionFee: '',
      balanceAfter: '',
      buttonDisabled: true,
      errorMessage: '',
      sent: false,
    }
  },
  methods: {
    sendTransaction() {
      if (this.sent) return;
      if (this.buttonDisabled) return;
      this.sent = true;
      console.log('send')
    }
  },
  created() {
    Model.showLoader(false);
    if (Model.state.newTransactionData) {
      this.currentBalance = Model.state.newTransactionData.balance + ' ETH';
      this.transactionFee = Model.state.newTransactionData.gasCostInEther + ' ETH';
      this.balanceAfter = Model.state.newTransactionData.balanceAfter + ' ETH';
      this.toAddress = Model.state.newTransactionData.toAddress;
      this.amount = Model.state.newTransactionData.amount;
      if (!Model.state.newTransactionData.status) {
        this.buttonDisabled = true;
        this.errorMessage = 'You do not have enough funds to make this transaction.';
      } else {
        this.buttonDisabled = false;
      }
    } else {
      this.buttonDisabled = true;
    }
    Model.state.navTitle = 'confirm transaction';
    Model.setNavbarState(true, false, true);

  },
  mounted() {
   // var element = document.querySelector('.transaction-info');
   // html2pdf(element);
  }
};
