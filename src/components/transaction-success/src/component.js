import Model from '../../../model/store';
export default {
  name: 'transaction-success',
  data() {
    return {
      model: Model.state
    }
  },
  computed:{
  	getHash(){
  		if(this.model.newTransactionData)
  		{
  			let suffix = this.model.network.toLowerCase() === 'test' ? 'rinkeby.' :''; 
  			return `//${suffix}etherscan.io/tx/${this.model.newTransactionData.sentTransactionHash}`;
  		}
  		return '';
  	}
  },
  created() {

  }
};
