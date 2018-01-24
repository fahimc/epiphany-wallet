import Store from '../../../model/model.js';
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
    }
  },
  created() {
    this.balance = this.currencyFormatted(Number(this.balance));
  }
};
