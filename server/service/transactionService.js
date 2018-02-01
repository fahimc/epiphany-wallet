const TransactionService = {
	interval:null,
	queuedTransactionCollection:[],
	transactionCollection:[],
	addressIndex:0,
	transactionIndex:0,
	init(){
		//this.interval = setInterval(this.onInterval.bind(this));
	},
	addTransaction(address,transaction){
		if(!this.queuedTransactionCollection[address])
		{
			this.queuedTransactionCollection[address] = {
				address:address,
				pendingTransactions:[]
			};
		}else{
		  this.queuedTransactionCollection[address].pendingTransactions.push(transaction);	
		}
	},
	checkTransactionStatus(){
		this.addAllQueued();
		this.addressIndex = 0;
		this.nextAddress();
	},
	addAllQueued(){
		for(let address in this.queuedTransactionCollection){
		  if(!this.transactionCollection[address]) {
			  this.transactionCollection[address] = {
				address:address,
				pendingTransactions: this.transactionCollection[address].pendingTransactions
			  }; 
		  }else{
		  	this.transactionCollection[address].pendingTransactions = this.transactionCollection[address].pendingTransactions.concat(this.queuedTransactionCollection[address].pendingTransactions);
		  }
		}
		this.queuedTransactionCollection = [];
	},
	nextAddress(){
		let addressCollection = Object.keys(this.transactionCollection);
		let addressObj = addressCollection[this.addressIndex];
		if(addressObj){
			this.nextTransaction(addressObj);
		}else{
			this.transactionCheckComplete();
		}
	},
	nextTransaction(addressObj){
		let transaction = addressObj.pendingTransactions[this.transactionIndex];
		if(transaction){
			//check transaction
			//remove if complete
			this.transactionIndex++;
			this.nextTransaction(addressObj);
		}else{
			this.transactionIndex=0;
			this.addressIndex++;
			this.nextAddress();
		}
        

	},
	transactionCheckComplete(){
		setTimeout(this.checkTransactionStatus.bind(this),3000);
	},
	addToPurge(address,transaction){
       //load purge list
       //add transaction to list
       this.queuedNewTransactionCollection[{
       	address,
       	transaction
       }];

	},

	onInterval(){
      //load purge list
      //add ner transactions to purge list
      //remove users transaction from the purge list
      //
	}
};

module.exports = TransactionService;