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
      this.formBackButtonClass = 'show';
      this.transactionShow = 'show';
      this.formVerifyButtonClass = '';
      this.formClass = '';
      if(event.data.status)
      {
        //disabled inputs
        this.activateSendButton();
      }
    },
    onTransferSent(event){
      /*
      {"nonce":5,"gasPrice":{"_bn":"4a817c800"},"gasLimit":{"_bn":"16e360"},"to":"0xb16B425FD68E3a87bfF2226b7092Bd1e00053e9e","value":{"_bn":"0"},"data":"0xa9059cbb000000000000000000000000e51052b916ee14f504230b81cf8c688a357862980000000000000000000000000000000000000000000000000000000000000064","v":43,"r":"0x3d6f9b70a4e417eeb5646e3dec6d3b68e3edb62b6c78b99199990f72207e991f","s":"0x0a1e98387737c9ebba86d8bd1bc2cb07be4f6f26b14db7212ab19f296a8e7b10","chainId":4,"from":"0xeDDf29Fa1fb8ADcbaCF1Ef3691604Bdb65341Ac6","hash":"0x636ed4420e25f00da0406d954d0287a91cc2e950a2607afa9e47f4945c9090f8"}*/
      this.formSendButtonClass = '';
      this.formBackButtonClass = '';
      this.showTransactionSent = 'show';
      this.transactionShow = '';
      this.transactionHash = event.data.hash;
      console.log('onTransferSent',event);

    },
    activateSendButton(){
      this.verifyButtonDisabled = true;
      this.sendButtonDisabled = false;
    },
    disableSendButton(){
      this.verifyButtonDisabled = true;
      this.sendButtonDisabled = false;
    },
    sendTransaction(){
       WalletService.sendTransfer(Store.privatekey,this.toAddress,this.amount,this.onTransferSent.bind(this));
    },
    showForm(){
      this.disableSendButton();
      this.formBackButtonClass = '';
      this.transactionShow = '';
      this.formClass = 'show';
      this.formVerifyButtonClass = 'show';
    },
    onQRRead(){
      let scanner = new Instascan.Scanner({ video: document.getElementById('qrPreview') });
      scanner.addListener('scan', function (content) {
        console.log(content);
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.error('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });
    }
  }
};
