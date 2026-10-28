'use strict';

const { DEFAULT_CONNECTION_CONFIG } = require('../Defaults/index.js');
const { makeCommunitiesSocket } = require('./communities.js');
const { makeInteropSocket } = require('./interop.js');
const { makePrivacySocket } = require('./privacy.js');
const { makeGraphQLSocket } = require('./graphql.js');
const { makeMessageBuilderSocket } = require('./message-builder.js');

// Export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    const satu = makeCommunitiesSocket(newConfig);
    const dua = makeInteropSocket(satu);
    const tiga = makePrivacySocket(dua);
    const empat = makeGraphQLSocket(tiga);
    return makeMessageBuilderSocket(empat);
};

module.exports = makeWASocket;
module.exports.default = makeWASocket;
module.exports.makeWASocket = makeWASocket;
