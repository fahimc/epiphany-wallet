import Store from '../../../model/model.js';
import Util from '../../../service/util.js';

export default {
name: 'balance-summary',
data(){
	return {
		address:Store.address,
		balance:Store.balance,
		balanceInUSD:(Store.balance * Store.currentPriceUSD).toFixed(2),
	}
},
created(){
	 this.balance = Util.currencyFormatted(Util.convertCurrencyValue(Number(this.balance)));
	 this.balanceInUSD = Util.currencyFormatted(Util.convertCurrencyValue(Number(this.balanceInUSD)));
}
};

