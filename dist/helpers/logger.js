"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerInfo = void 0;
const winston_1 = __importDefault(require("winston"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
require("winston-daily-rotate-file");
const path_1 = __importDefault(require("path"));
const timestampFormat = () => (0, moment_timezone_1.default)().tz("Europe/Istanbul").format("YYYY-MM-DD HH:mm:ss");
const createLogger = (companyName, companyId) => {
    const logsDirectory = path_1.default.join(process.cwd(), "logs", `${companyName}_${companyId}`);
    const transport = new winston_1.default.transports.DailyRotateFile({
        dirname: logsDirectory,
        filename: `${companyName}_${companyId}-%DATE%.log`,
        datePattern: "YYYY-wo",
        zippedArchive: false,
        maxFiles: "4w",
    });
    return winston_1.default.createLogger({
        level: "info",
        format: winston_1.default.format.combine(winston_1.default.format.printf(({ level, message }) => {
            return `${timestampFormat()} [${level.toUpperCase()}]: ${message}`;
        })),
        transports: [new winston_1.default.transports.Console(), transport],
    });
};
const loggerInfo = (companyName, companyId, type, functionName, adminUserId, msg) => {
    const logger = createLogger(companyName, companyId);
    logger.info(`Entities&Type: ${type} || Kullanıcı Admin Ismi: ${functionName} || Kullanıcı Admin Id: ${adminUserId} || Mesaj: ${msg}`);
};
exports.loggerInfo = loggerInfo;
//# sourceMappingURL=logger.js.map