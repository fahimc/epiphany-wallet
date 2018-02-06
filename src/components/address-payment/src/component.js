import Model from '../../../model/store';
export default {
  name: 'address-payment',
  created() {
    Model.state.navTitle = 'address payment';
    Model.setNavbarState(true, false, true);
  }
};
