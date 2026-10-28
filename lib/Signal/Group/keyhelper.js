const nodeCrypto = require('crypto');
const { generateKeyPair } = require('libsignal/src/curve.js');
function generateSenderKey() {
    return nodeCrypto.randomBytes(32);
}
function generateSenderKeyId() {
    return nodeCrypto.randomInt(2147483647);
}
function generateSenderSigningKey(key) {
    if (!key) {
        key = generateKeyPair();
    }
    return {
        public: Buffer.from(key.pubKey),
        private: Buffer.from(key.privKey)
    };
}
//# sourceMappingURL=keyhelper.js.map

module.exports.generateSenderKey = generateSenderKey;
module.exports.generateSenderKeyId = generateSenderKeyId;
module.exports.generateSenderSigningKey = generateSenderSigningKey;