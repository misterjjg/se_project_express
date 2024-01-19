const { JWT_SECRET = "dev-secret-key", NODE_ENV = "production" } = process.env;
module.exports = { JWT_SECRET, NODE_ENV };
