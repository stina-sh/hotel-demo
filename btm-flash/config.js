/* Static hosting: leave endpoint empty to prepare requests in the visitor's email app.
   Production: set an HTTPS endpoint accepting JSON, then deploy the same static files. */
window.EPE_CONFIG = { requestEndpoint: '', contactEmail: 'contact@electricien-paris-express.com' };
