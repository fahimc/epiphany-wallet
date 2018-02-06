import Store from '../../../model/model.js';
import Model from '../../../model/store';
export default {
  name: 'navbar',
  data() {
    return {
      title: Store.navTitle,
      model: Model.state,
      showMenuClass:'',
    }
  },
  methods:{
  	goBack(){
  		this.$router.go(-1);
      Model.showLoader(false);
  	},
    openMenu(){
      this.showMenuClass = 'show';
    },
    onHideMenu(){
       this.showMenuClass = '';
    }
  }
};
