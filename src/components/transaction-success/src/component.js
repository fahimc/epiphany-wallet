import Model from '../../../model/store';
export default {
  name: 'transaction-success',
  data() {
    return {
      model: Model.state
    }
  },
  computed: {
    getHash() {
      if (this.model.newTransactionData) {
        let suffix = this.model.network.toLowerCase() === 'test' ? 'rinkeby.' : '';
        return `//${suffix}etherscan.io/tx/${this.model.newTransactionData.sentTransactionHash}`;
      }
      return '';
    },
    date() {
      return new Date().toString();
    }
  },
  methods: {
    createdPDF() {
      var element = document.querySelector('.transaction-pdf');
      html2pdf(element, {
        margin: 1,
        filename: `${this.model.newTransactionData.sentTransactionHash}_receipt.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { dpi: 192, letterRendering: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      });
    }
  },
  created() {}
};
