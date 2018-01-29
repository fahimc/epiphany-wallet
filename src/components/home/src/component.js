import Store from '../../../model/model.js';
import WalletService from '../../../service/walletservice.js';
import Util from '../../../service/util.js';
if (!window.web3) window.web3 = new Web3(Web3.currentProvider);

export default {
  name: 'home',
  data() {
    return {
      balance: Store.balance,
      transactions: [],
    };
  },
  methods: {

    onTransaction(event) {
      console.log('onTransaction', event);
      let network = Store.network == 'test' ? 'rinkeby.' : '';
      if(!event.data)return;
      event.data.forEach((item) => {
        if(!item.data)return;
        console.log(item.data.params[1].value);
        let obj = {
          date: Util.formatDate(new Date(item.timeStamp * 1000)),
          transfer: (item.type == 'SENT' ? '-' : '') +  Util.currencyFormatted(Number(item.data.params[1].value)),
          type: item.type,
          transferClass:item.type == 'SENT' ? 'text-danger' : 'text-primary',
          fee: web3.fromWei(item.gasUsed * item.gasPrice),
          hash: item.hash,
          link: `//${network}etherscan.io/tx/` + item.hash,
          item: item
        }
        this.transactions.push(obj);
      });
    }
  },
  created() {
    this.balance = Util.currencyFormatted(Util.convertCurrencyValue(Number(this.balance)));
    WalletService.getTransactions(Store.address,this.onTransaction.bind(this));
    //WalletService.getTransactions('0x8B3E95e721AaCC68e235c95589e3600d0C81d045', this.onTransaction.bind(this));
  },

};
