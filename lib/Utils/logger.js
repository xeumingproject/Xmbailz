const P = require('pino');
module.exports = module.exports || {};
module.exports.default = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` });
Object.assign(module.exports, module.exports);
//# sourceMappingURL=logger.js.map