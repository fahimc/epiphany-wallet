import Store from '../../../model/model.js';

export default {
  name: 'request-payment',
  mounted() {
    console.log('here',Store);
    new QRCode(document.getElementById("qrcode"), {
      text: `${Store.address}_50`,
      width: 300,
      height: 300,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
  }
};
