import WalletService from '../../../service/walletservice.js';

export default {
  name: 'login',
  data(){
    return {
    privatekey: ''
    }
  },
  methods: {
    login(event) {
      if(this.privatekey){
          WalletService.login(this.privatekey,this.onLogin.bind(this));
      }
    },
    onLogin(data){
        console.log(data);
        if(!data.error)
        {
            this.$router.push('/home');
        }
    }
  }
};
