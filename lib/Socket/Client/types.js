const { EventEmitter } = require('events');
const { URL } = require('url');
class AbstractSocketClient extends EventEmitter {
    constructor(url, config) {
        super();
        this.url = url;
        this.config = config;
        this.setMaxListeners(0);
    }
}
//# sourceMappingURL=types.js.map

module.exports.AbstractSocketClient = AbstractSocketClient;