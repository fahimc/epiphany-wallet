import Store from '../../../model/model.js';

export default {
  name: 'request-payment',
  data() {
    return {
      amount: '',
      qrShow:''
    }
  },
  methods: {
    generate() {
      this.qrShow = 'show';
      new QRCode(document.getElementById("qrcode"), {
        text: `${Store.address}__${this.amount}`,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      document.getElementById("qrcode").classList.add('show');
    }
  },
  mounted() {

  }
};
