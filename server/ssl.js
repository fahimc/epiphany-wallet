var le = require('letsencrypt').create({ server: 'production' });
 
var opts = {
  domains: ['service.epiphanycoins.com'], email: 'info@epiphanycoins.com', agreeTos: true
};
 
le.register(opts).then(function (certs) {
  console.log(certs);
  // privkey, cert, chain, expiresAt, issuedAt, subject, altnames 
}, function (err) {
  console.error(err);
});

module.exports = le;