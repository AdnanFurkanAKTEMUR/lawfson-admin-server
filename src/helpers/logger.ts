import winston from "winston";
import moment from "moment-timezone";

// Özel zaman damgası formatı
const timestampFormat = () => moment().tz("Europe/Istanbul").format("YYYY-MM-DD HH:mm:ss");

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      return `${timestampFormat()} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console(), new winston.transports.File({ filename: "admin.log" })],
});

export const loggerInfo = (type: string, functionName: string, adminUserId: number, msg: string | null) => {
  logger.info(`Entities&Type: ${type} || Fonksiyon ismi: ${functionName} || Kullanıcı admin id: ${adminUserId} || Mesaj: ${msg} `);
};
