import WalletService from '../../../service/walletservice.js';
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
    }
  },
  methods: {
    sendTransaction() {
      if (Model.state.newTransactionData.sent) return;
      if (this.buttonDisabled) return;
      Model.state.newTransactionData.sent = true;
      WalletService.sendTransfer(Store.privatekey, this.toAddress, this.amount, this.onTransferSent.bind(this));
      console.log('send')
    },
    onTransferSent(event) {
      /*
      {"nonce":5,"gasPrice":{"_bn":"4a817c800"},"gasLimit":{"_bn":"16e360"},"to":"0xb16B425FD68E3a87bfF2226b7092Bd1e00053e9e","value":{"_bn":"0"},"data":"0xa9059cbb000000000000000000000000e51052b916ee14f504230b81cf8c688a357862980000000000000000000000000000000000000000000000000000000000000064","v":43,"r":"0x3d6f9b70a4e417eeb5646e3dec6d3b68e3edb62b6c78b99199990f72207e991f","s":"0x0a1e98387737c9ebba86d8bd1bc2cb07be4f6f26b14db7212ab19f296a8e7b10","chainId":4,"from":"0xeDDf29Fa1fb8ADcbaCF1Ef3691604Bdb65341Ac6","hash":"0x636ed4420e25f00da0406d954d0287a91cc2e950a2607afa9e47f4945c9090f8"}*/

      Model.state.newTransactionData.sentTransactionHash = event.data.hash;
      console.log('onTransferSent', event);
      this.$router.push('/transaction-success');	
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
