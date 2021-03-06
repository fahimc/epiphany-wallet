import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/login';
import Home from '@/components/home/home';
import MakePayment from '@/components/make-payment/make-payment';
import RequestPayment from '@/components/request-payment/request-payment';
import NewWallet from '@/components/new-wallet/new-wallet';
import AddressPayment from '@/components/address-payment/address-payment';
import VerifyTransaction from '@/components/verify-transaction/verify-transaction';
import TransactionSuccess from '@/components/transaction-success/transaction-success';
import QRCodePreview from '@/components/qr-code-preview/qr-code-preview';
import ReadQRCode from '@/components/read-qr-code/read-qr-code';
import Store from '../model/model.js';
import Model from '../model/store';

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/make-payment',
      name: 'MakePayment',
      component: MakePayment
    },
    {
      path: '/request-payment',
      name: 'RequestPayment',
      component: RequestPayment
    },
    {
      path: '/new-wallet',
      name: 'NewWallet',
      component: NewWallet
    },
    {
      path: '/address-payment',
      name: 'AddressPayment',
      component: AddressPayment
    },
    {
      path: '/verify-transaction',
      name: 'VerifyTransaction',
      component: VerifyTransaction
    },
    {
      path: '/transaction-success',
      name: 'TransactionSuccess',
      component: TransactionSuccess
    },
    {
      path: '/qr-code-preview',
      name: 'QRCodePreview',
      component: QRCodePreview
    },
    {
      path: '/read-qr-code',
      name: 'ReadQRCode',
      component: ReadQRCode
    }
  ]
});

if(!Model.IS_DEVELOPMENT_MODE){
router.beforeEach((to, from,next) => {
    if (!Store.address && to.name !== 'Login' && to.name !== 'NewWallet') {
        next('/');
    } else {
        next()
    }
});  
}


/**/

export default router;
