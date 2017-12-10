const config = {
  headers: {
    allowHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization',
    allowedMethods: ['GET, POST, PUT, DELETE'],
    domains: '*',
    maxAge: 'max-age = 3600',
  },
  port: 3001, // changing the PORT here will also require changing the proxy port in client/package.json
};

module.exports = config;
