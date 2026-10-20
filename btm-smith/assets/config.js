/* Set contactMode to "endpoint" and supply an HTTPS endpoint for direct delivery.
   The endpoint must accept JSON and return a successful HTTP status only after delivery.
   No private key or service credential belongs in this public file. */
window.SPE_CONFIG = Object.freeze({
  contactMode: 'mailto',
  contactEndpoint: '',
  contactEmail: 'contact@serrurier-paris-express.com'
});
