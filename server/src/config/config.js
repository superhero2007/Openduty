let env = process.env.MODE || 'development';
env = `./${env}`;
module.exports = require(env);
