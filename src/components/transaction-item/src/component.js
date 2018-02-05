export default {
  name: 'transaction-item',
  data() {
    return {
      item: null
    };
  },
  created() {
    this.item = this.$attrs.item;
  }
};
