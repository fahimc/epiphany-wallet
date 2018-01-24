import Store from '../../../model/model.js';
import WalletService from '../../../service/walletservice.js';

export default {
  name: 'home',
  data() {
    return {
      balance: Store.balance
    };
  },
  methods: {
    currencyFormatted(amount) {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    onTransaction(data){
      console.log('onTransaction',data);
    }
  },
  created() {
    this.balance = this.currencyFormatted(Number(this.balance));
    WalletService.getTransactions(Store.address,this.onTransaction.bind(this));
  }
};
