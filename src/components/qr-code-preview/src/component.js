import Model from '../../../model/store';
export default {
  name: 'qr-code-preview',
  data(){
  	return {
  		qrCode:''
  	}
  },
  mounted() {
  	if(!Model.state.requestAmount||!Model.state.address)return;
  	this.qrCode = `${Model.state.address}__${Model.state.requestAmount}`;
    new QRCode(document.getElementById("qrcode"), {
      text: `${Model.state.address}__${Model.state.requestAmount}`,
      width: (window.innerWidth  * 0.9) - 80 < 300 ? (window.innerWidth  * 0.9) - 80 : 300,
      height: (window.innerWidth  * 0.9) - 80 < 300 ? (window.innerWidth  * 0.9) - 80 : 300,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
};
