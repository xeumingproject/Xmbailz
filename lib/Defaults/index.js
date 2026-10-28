const { proto } = require('../../WAProto/index.js');
const { makeLibSignalRepository } = require('../Signal/libsignal.js');
const { Browsers } = require('../Utils/browser-utils.js');
const logger = require('../Utils/logger.js');
const version = [2, 3000, 1043857760];
const UNAUTHORIZED_CODES = [401, 403, 419];
const DEFAULT_ORIGIN = 'https://web.whatsapp.com';
const CALL_VIDEO_PREFIX = 'https://call.whatsapp.com/video/';
const CALL_AUDIO_PREFIX = 'https://call.whatsapp.com/voice/';
const DEF_CALLBACK_PREFIX = 'CB:';
const DEF_TAG_PREFIX = 'TAG:';
const PHONE_CONNECTION_CB = 'CB:Pong';
const WA_ADV_ACCOUNT_SIG_PREFIX = Buffer.from([6, 0]);
const WA_ADV_DEVICE_SIG_PREFIX = Buffer.from([6, 1]);
const WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX = Buffer.from([6, 5]);
const WA_ADV_HOSTED_DEVICE_SIG_PREFIX = Buffer.from([6, 6]);
const WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60;
/** Status messages older than 24 hours are considered expired */
const STATUS_EXPIRY_SECONDS = 24 * 60 * 60;
/** WA Web enforces a 14-day maximum age for placeholder resend requests */
const PLACEHOLDER_MAX_AGE_SECONDS = 14 * 24 * 60 * 60;
const NOISE_MODE = 'Noise_XX_25519_AESGCM_SHA256\0\0\0\0';
const DICT_VERSION = 3;
const KEY_BUNDLE_TYPE = Buffer.from([5]);
const NOISE_WA_HEADER = Buffer.from([87, 65, 6, DICT_VERSION]); // last is "DICT_VERSION"
/** from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
const URL_REGEX = /https:\/\/(?![^:@\/\s]+:[^:@\/\s]+@)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?/g;
const WA_CERT_DETAILS = {
    SERIAL: 0,
    ISSUER: 'WhatsAppLongTerm1',
    PUBLIC_KEY: Buffer.from('142375574d0a587166aae71ebe516437c4a28b73e3695c6ce1f7f9545da8ee6b', 'hex')
};
const PROCESSABLE_HISTORY_TYPES = [
    proto.HistorySync.HistorySyncType.INITIAL_BOOTSTRAP,
    proto.HistorySync.HistorySyncType.PUSH_NAME,
    proto.HistorySync.HistorySyncType.RECENT,
    proto.HistorySync.HistorySyncType.FULL,
    proto.HistorySync.HistorySyncType.ON_DEMAND,
    proto.HistorySync.HistorySyncType.NON_BLOCKING_DATA,
    proto.HistorySync.HistorySyncType.INITIAL_STATUS_V3
];
const DEFAULT_CACHE_TTLS = {
    SIGNAL_STORE: 5 * 60, // 5 minutes
    MSG_RETRY: 60 * 60, // 1 hour
    CALL_OFFER: 5 * 60, // 5 minutes
    USER_DEVICES: 5 * 60 // 5 minutes
};
const DEFAULT_CONNECTION_CONFIG = {
    version: version,
    browser: Browsers.macOS('Chrome'),
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
    connectTimeoutMs: 20000,
    keepAliveIntervalMs: 30000,
    logger: logger.child({ class: 'baileys' }),
    emitOwnEvents: true,
    defaultQueryTimeoutMs: 60000,
    customUploadHosts: [],
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
    fireInitQueries: true,
    auth: undefined,
    autoFollow: true,
    markOnlineOnConnect: true,
    aiLabel: true,
    syncFullHistory: true,
    patchMessageBeforeSending: msg => msg,
    shouldSyncHistoryMessage: ({ syncType }) => {
        return syncType !== proto.HistorySync.HistorySyncType.FULL;
    },
    shouldIgnoreJid: () => false,
    linkPreviewImageThumbnailWidth: 192,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    generateHighQualityLinkPreview: false,
    enableAutoSessionRecreation: true,
    enableRecentMessageCache: true,
    options: {},
    appStateMacVerification: {
        patch: false,
        snapshot: false
    },
    countryCode: 'US',
    getMessage: async () => undefined,
    cachedGroupMetadata: async () => undefined,
    makeSignalRepository: makeLibSignalRepository
};
const MEDIA_PATH_MAP = {
    image: '/mms/image',
    video: '/mms/video',
    document: '/mms/document',
    audio: '/mms/audio',
    sticker: '/mms/image',
    'thumbnail-link': '/mms/image',
    'product-catalog-image': '/product/image',
    'md-app-state': '',
    'md-msg-hist': '/mms/md-app-state',
    'biz-cover-photo': '/pps/biz-cover-photo'
};
const MEDIA_HKDF_KEY_MAPPING = {
    audio: 'Audio',
    document: 'Document',
    gif: 'Video',
    image: 'Image',
    ppic: '',
    product: 'Image',
    ptt: 'Audio',
    sticker: 'Image',
    video: 'Video',
    'thumbnail-document': 'Document Thumbnail',
    'thumbnail-image': 'Image Thumbnail',
    'thumbnail-video': 'Video Thumbnail',
    'thumbnail-link': 'Link Thumbnail',
    'md-msg-hist': 'History',
    'md-app-state': 'App State',
    'product-catalog-image': '',
    'payment-bg-image': 'Payment Background',
    ptv: 'Video',
    'biz-cover-photo': 'Image'
};
const MEDIA_KEYS = Object.keys(MEDIA_PATH_MAP);
/** 120s timeout for history sync stall detection, same as WA Web's handleChunkProgress / restartPausedTimer (g = 120) */
const HISTORY_SYNC_PAUSED_TIMEOUT_MS = 120000;
const MIN_PREKEY_COUNT = 5;
const INITIAL_PREKEY_COUNT = 812;
const UPLOAD_TIMEOUT = 30000; // 30 seconds
const TimeMs = {
    Minute: 60 * 1000,
    Hour: 60 * 60 * 1000,
    Day: 24 * 60 * 60 * 1000,
    Week: 7 * 24 * 60 * 60 * 1000
};
//# sourceMappingURL=index.js.map


module.exports.UNAUTHORIZED_CODES = UNAUTHORIZED_CODES;
module.exports.DEFAULT_ORIGIN = DEFAULT_ORIGIN;
module.exports.CALL_VIDEO_PREFIX = CALL_VIDEO_PREFIX;
module.exports.CALL_AUDIO_PREFIX = CALL_AUDIO_PREFIX;
module.exports.DEF_CALLBACK_PREFIX = DEF_CALLBACK_PREFIX;
module.exports.DEF_TAG_PREFIX = DEF_TAG_PREFIX;
module.exports.PHONE_CONNECTION_CB = PHONE_CONNECTION_CB;
module.exports.WA_ADV_ACCOUNT_SIG_PREFIX = WA_ADV_ACCOUNT_SIG_PREFIX;
module.exports.WA_ADV_DEVICE_SIG_PREFIX = WA_ADV_DEVICE_SIG_PREFIX;
module.exports.WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX = WA_ADV_HOSTED_ACCOUNT_SIG_PREFIX;
module.exports.WA_ADV_HOSTED_DEVICE_SIG_PREFIX = WA_ADV_HOSTED_DEVICE_SIG_PREFIX;
module.exports.WA_DEFAULT_EPHEMERAL = WA_DEFAULT_EPHEMERAL;
module.exports.STATUS_EXPIRY_SECONDS = STATUS_EXPIRY_SECONDS;
module.exports.PLACEHOLDER_MAX_AGE_SECONDS = PLACEHOLDER_MAX_AGE_SECONDS;
module.exports.NOISE_MODE = NOISE_MODE;
module.exports.DICT_VERSION = DICT_VERSION;
module.exports.KEY_BUNDLE_TYPE = KEY_BUNDLE_TYPE;
module.exports.NOISE_WA_HEADER = NOISE_WA_HEADER;
module.exports.URL_REGEX = URL_REGEX;
module.exports.WA_CERT_DETAILS = WA_CERT_DETAILS;
module.exports.PROCESSABLE_HISTORY_TYPES = PROCESSABLE_HISTORY_TYPES;
module.exports.DEFAULT_CACHE_TTLS = DEFAULT_CACHE_TTLS;
module.exports.DEFAULT_CONNECTION_CONFIG = DEFAULT_CONNECTION_CONFIG;
module.exports.MEDIA_PATH_MAP = MEDIA_PATH_MAP;
module.exports.MEDIA_HKDF_KEY_MAPPING = MEDIA_HKDF_KEY_MAPPING;
module.exports.MEDIA_KEYS = MEDIA_KEYS;
module.exports.HISTORY_SYNC_PAUSED_TIMEOUT_MS = HISTORY_SYNC_PAUSED_TIMEOUT_MS;
module.exports.MIN_PREKEY_COUNT = MIN_PREKEY_COUNT;
module.exports.INITIAL_PREKEY_COUNT = INITIAL_PREKEY_COUNT;
module.exports.UPLOAD_TIMEOUT = UPLOAD_TIMEOUT;
module.exports.TimeMs = TimeMs;