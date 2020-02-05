export function isNodeEnvDevelopment() {
  return process.env.NODE_ENV.toLowerCase() === 'development';
}

export function isNodeEnvProduction() {
  return process.env.NODE_ENV.toLowerCase() === 'production';
}

export function isNodeEnvTest() {
  return process.env.NODE_ENV.toLowerCase() === 'test';
}
