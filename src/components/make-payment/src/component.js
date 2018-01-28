export default {
  name: 'make-payment',
  data() {
    return {
      toAddress: '',
      amount: '',
    }
  },
  methods: {
    goBack() {
      console.log('back');
      this.$router.push('/home');
    }
  }
};
