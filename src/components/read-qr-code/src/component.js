import Model from '../../../model/store';
import Util from '../../../service/util.js';
import WalletService from '../../../service/walletservice.js';

export default {
  name: 'read-qr-code',
  data() {
    return {
      video: null,
      stream: null,
      qr: null,
      results: []
    };
  },
  created() {
    Model.state.navTitle = 'read qr code';
    Model.setNavbarState(true, false, true);
  },
  methods: {
    onUserMedia(stream) {
      this.stream = stream;
      this.video.src = window.URL.createObjectURL(stream);
    },
    onUserMediaError() {

    },
    onDecode(err, result) {
      //if (err) throw err;
      if (result) this.results.push(result);
      console.log(result);
      let lastResult;
      let found;
      this.results.forEach((item) => {
        if (!lastResult) {
          lastResult = item;
        } else {
          if (lastResult == item) found = item;
          lastResult = item;
        }
      });
      if (found) {
      	if(!this.qr)return;
      	this.qr.stream.getVideoTracks()[0].stop();
      	this.qr = null;
        this.estimateTransaction(found);
      }
      console.log('found', found);
    },
    estimateTransaction(data) {
      let address = data.split('__')[0];
      let amount = data.split('__')[1];
      Model.showLoader(true);
      this.toAddress = address;
      this.amount = amount;
      WalletService.estimateTransfer(Model.state.privateKey, this.toAddress, this.amount, this.onEstimation.bind(this));


    },
    onEstimation(event) {
      console.log('onEstimation', event);
      if (event.error) {
        Util.showAlert('Something went wrong. Please try again.');
        Model.showLoader(false);
        return;
      }
      Model.state.newTransactionData = event.data;
      Model.state.newTransactionData.toAddress = this.toAddress;
      Model.state.newTransactionData.amount = this.amount;

      this.$router.push('/verify-transaction');
    }
  },
  mounted() {
    this.video = document.querySelector('video');

    if (navigator.getUserMedia) {
      navigator.getUserMedia({ audio: false, video: true }, this.onUserMedia.bind(this), this.onUserMediaError.bind(this));
    } else {
      this.video.src = ''; // fallback.
    }
    this.qr = new QCodeDecoder();
    let results = [];
    this.qr.decodeFromCamera(this.video, this.onDecode.bind(this));
  },
  beforeDestroy() {
    console.log(this.stream);
    //this.video.src= '';
    this.stream.getVideoTracks()[0].stop();
  }
};
