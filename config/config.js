const config = {
  port: process.env.APP_PORT || 8050,
  baseURL: process.env.BASEURL,
  tokenKey: process.env.TOKEN_KEY,
};

module.exports = config;