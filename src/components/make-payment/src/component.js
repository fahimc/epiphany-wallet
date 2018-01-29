import Util from '../../../service/util.js';
import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';

export default {
  name: 'make-payment',
  data() {
    return {
      toAddress: '',
      amount: '',
      currentBalance: '',
      transactionFee: '',
      balanceAfter: '',
      transactionClass: 'text-muted',
      verifyButtonDisabled: false,
      sendButtonDisabled: true,
    }
  },
  methods: {
    goBack() {
      console.log('back');
      this.$router.push('/home');
    },
    checkCost() {
      if (!this.toAddress || !this.amount) {
        Util.showAlert('Please fill in all details');
      } else {
        Util.hideAlert();
        Store.privatekey = '0xc876c481add221e551f6420bc1e6be6a3b28004691a279ea8613fc54a031db25';
        console.log(Store.privatekey,this.toAddress,this.amount);
        WalletService.estimateTransfer(Store.privatekey,this.toAddress,this.amount,this.onEstimation.bind(this));
      }
    },
    onEstimation(event){
      console.log('onEstimation',event);
      if(event.error)
      {
        Util.showAlert('Something went wrong. Please try again.');
        return;
      }
      //balance: "2.876960384", gasCostInEther: "0.000263151", balanceAfter: 2.8766972330000002, status: true
      this.currentBalance = event.data.balance + ' ETH';
      this.transactionFee = event.data.gasCostInEther + ' ETH';
      this.balanceAfter = event.data.balanceAfter + ' ETH';
      this.transactionClass = 'text-dark';
      if(event.data.status)
      {
        //disabled inputs
        this.showSendButton();
      }
    },
    showSendButton(){
      this.verifyButtonDisabled = true;
      this.sendButtonDisabled = false;
    },
    sendTransaction(){

    }
  }
};
