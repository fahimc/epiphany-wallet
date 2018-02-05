import Vue from 'vue'
let store = {
  state:{
    navbarClass: '',
    navTitle: '',
    loaderClass: '',
    currentPriceUSD:0.5,
  },
  IS_DEVELOPMENT_MODE:false
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
