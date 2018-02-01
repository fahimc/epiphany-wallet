import Store from '../../../model/model.js';

export default {
  name: 'request-payment',
  data() {
    return {
      amount: 0
    }
  },
  methods: {
    generate() {
      new QRCode(document.getElementById("qrcode"), {
        text: `${Store.address}__${this.amount}`,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted() {

  }
};
