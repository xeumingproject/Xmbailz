Object.assign(module.exports, require('./Auth.js'));
Object.assign(module.exports, require('./GroupMetadata.js'));
Object.assign(module.exports, require('./Chat.js'));
Object.assign(module.exports, require('./Contact.js'));
Object.assign(module.exports, require('./State.js'));
Object.assign(module.exports, require('./Message.js'));
Object.assign(module.exports, require('./Socket.js'));
Object.assign(module.exports, require('./Events.js'));
Object.assign(module.exports, require('./Product.js'));
Object.assign(module.exports, require('./Call.js'));
Object.assign(module.exports, require('./Signal.js'));
Object.assign(module.exports, require('./Mex.js'));
var DisconnectReason;
(function (DisconnectReason) {
    DisconnectReason[DisconnectReason["connectionClosed"] = 428] = "connectionClosed";
    DisconnectReason[DisconnectReason["connectionLost"] = 408] = "connectionLost";
    DisconnectReason[DisconnectReason["connectionReplaced"] = 440] = "connectionReplaced";
    DisconnectReason[DisconnectReason["timedOut"] = 408] = "timedOut";
    DisconnectReason[DisconnectReason["loggedOut"] = 401] = "loggedOut";
    DisconnectReason[DisconnectReason["badSession"] = 500] = "badSession";
    DisconnectReason[DisconnectReason["restartRequired"] = 515] = "restartRequired";
    DisconnectReason[DisconnectReason["multideviceMismatch"] = 411] = "multideviceMismatch";
    DisconnectReason[DisconnectReason["forbidden"] = 403] = "forbidden";
    DisconnectReason[DisconnectReason["unavailableService"] = 503] = "unavailableService";
})(DisconnectReason || (DisconnectReason = {}));
//# sourceMappingURL=index.js.map

module.exports.DisconnectReason = DisconnectReason;