export default {
  name: 'transaction-item',
  data() {
    return {
      item: null
    };
  },
  computed: {
    TransactionHash() {
    	console.log(this.item);
      if (this.item && this.item.type && this.item.type.toUpperCase() == 'SENT') {
        return this.item.item.to;
      } else if (this.item) {
        return this.item.item.from;
      }
      return '';
    }
  },
  methods: {

  },
  created() {
    this.item = this.$attrs.item;
  }
};
