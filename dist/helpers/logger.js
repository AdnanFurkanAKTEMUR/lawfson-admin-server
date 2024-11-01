"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerInfo = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const timestampFormat = () => (0, moment_timezone_1.default)().tz("Europe/Istanbul").format("YYYY-MM-DD HH:mm:ss");
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.printf(({ level, message }) => {
        return `${timestampFormat()} [${level.toUpperCase()}]: ${message}`;
    })),
    transports: [new winston_1.default.transports.Console(), new winston_1.default.transports.File({ filename: "admin.log" })],
});
const loggerInfo = (type, functionName, adminUserId, msg) => {
    exports.logger.info(`Entities&Type: ${type} || Fonksiyon ismi: ${functionName} || Kullanıcı admin id: ${adminUserId} || Mesaj: ${msg} `);
};
exports.loggerInfo = loggerInfo;
//# sourceMappingURL=logger.js.map