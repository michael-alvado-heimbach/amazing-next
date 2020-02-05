function isNodeEnvDevelopment() {
  return process.env.NODE_ENV.toLowerCase() === 'development';
}

module.exports = {
  isNodeEnvDevelopment,
};
