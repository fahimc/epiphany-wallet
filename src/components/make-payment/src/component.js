import Util from '../../../service/util.js';
import WalletService from '../../../service/walletservice.js';
import Store from '../../../model/model.js';
import Model from '../../../model/store';
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
      transactionShow: '',
      formClass: 'show',
      verifyButtonDisabled: false,
      sendButtonDisabled: true,
      formBackButtonClass: '',
      formVerifyButtonClass: 'show',
      formSendButtonClass: 'show',
      showTransactionSent: '',
      transactionHash: '',
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
        Model.showLoader(true);
        console.log(Store.privatekey, this.toAddress, this.amount);
        WalletService.estimateTransfer(Store.privatekey, this.toAddress, this.amount, this.onEstimation.bind(this));
      }
    },
    onEstimation(event) {
      console.log('onEstimation', event);
      if (event.error) {
        Util.showAlert('Something went wrong. Please try again.');
        return;
      }
      //balance: "2.876960384", gasCostInEther: "0.000263151", balanceAfter: 2.8766972330000002, status: true
      this.currentBalance = event.data.balance + ' ETH';
      this.transactionFee = event.data.gasCostInEther + ' ETH';
      this.balanceAfter = event.data.balanceAfter + ' ETH';
      this.transactionClass = 'text-dark';
      this.formBackButtonClass = 'show';
      this.transactionShow = 'show';
      this.formVerifyButtonClass = '';
      this.formClass = '';
      if (event.data.status) {
        //disabled inputs
        this.activateSendButton();
      }
    },
    
    activateSendButton() {
      this.verifyButtonDisabled = true;
      this.sendButtonDisabled = false;
    },
    disableSendButton() {
      this.verifyButtonDisabled = true;
      this.sendButtonDisabled = false;
    },
    sendTransaction() {
      WalletService.sendTransfer(Store.privatekey, this.toAddress, this.amount, this.onTransferSent.bind(this));
    },
    showForm() {
      this.disableSendButton();
      this.formBackButtonClass = '';
      this.transactionShow = '';
      this.formClass = 'show';
      this.formVerifyButtonClass = 'show';
    },
    onQRRead() {

      var video = document.querySelector('video');

      if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: false, video: true }, function(stream) {
          video.src = window.URL.createObjectURL(stream);
        }, () => {});
      } else {
        video.src = ''; // fallback.
      }
      var qr = new QCodeDecoder();
      let results = [];
      qr.decodeFromCamera(video, function(err,result) {
        //if (err) throw err;
        if(result)results.push(result);
        console.log(result);
        let lastResult;
        let found;
        results.forEach((item)=>{
          if(!lastResult)
          {
              lastResult = item;
          }else{
              if(lastResult == item)found = item;
              lastResult = item;
          }
        });
        if(found)
        console.log('found',found);
      });
       $('#qr-reader-modal').modal('show');
    }
  },
  created(){
    Model.state.navTitle = 'make a payment';
    Model.setNavbarState(true,false,true);
     $('#qr-reader-modal').modal({
      backdrop: false
    });
  }
};
