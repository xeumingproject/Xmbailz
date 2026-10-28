const { proto } = require('../../WAProto/index.js');
// export the WAMessage Prototypes
module.exports.WAProto = proto;
const WAMessageStubType = proto.WebMessageInfo.StubType;
const WAMessageStatus = proto.WebMessageInfo.Status;
var WAMessageAddressingMode;
(function (WAMessageAddressingMode) {
    WAMessageAddressingMode["PN"] = "pn";
    WAMessageAddressingMode["LID"] = "lid";
})(WAMessageAddressingMode || (WAMessageAddressingMode = {}));
//# sourceMappingURL=Message.js.map

module.exports.WAMessageStubType = WAMessageStubType;
module.exports.WAMessageStatus = WAMessageStatus;
module.exports.WAMessageAddressingMode = WAMessageAddressingMode;