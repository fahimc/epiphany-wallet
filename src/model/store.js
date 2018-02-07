import Vue from 'vue'
let store = {
  state:{
    navbarClass: '',
    navTitle: '',
    loaderClass: '',
    currentPriceUSD:0.5,
    newTransactionData:null,
    privateKey:'',
    network:'main',
  },
  IS_DEVELOPMENT_MODE:true,
  LIVE_SERVICE_URL:'//eny4.co.uk',
  LOCAL_SERVICE_URL:'//localhost:3000',
  SERVICE_URL(){
    return this.IS_DEVELOPMENT_MODE ? this.LOCAL_SERVICE_URL : this.LIVE_SERVICE_URL;
  }
}
export default new Vue({
  data: store,
  methods:{
    setNavbarState(isShow,isMenu,isBack){
      this.state.navbarClass = isShow ? 'show': '';
      if(isMenu)this.state.navbarClass += ' show-menu';
      if(isBack)this.state.navbarClass += ' show-back';
    },
    showLoader(isShow){
      this.state.loaderClass = isShow ? 'show' : '';
    }
  }
})
