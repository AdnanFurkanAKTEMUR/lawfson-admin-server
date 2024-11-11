import winston from "winston";
import moment from "moment-timezone";
import "winston-daily-rotate-file";
import path from "path";

// Özel zaman damgası formatı
const timestampFormat = () => moment().tz("Europe/Istanbul").format("YYYY-MM-DD HH:mm:ss");

// Logger oluşturma fonksiyonu
const createLogger = (companyName: string, companyId: number) => {
  // logs dizinini projenin kök dizinine kayıt eder
  const logsDirectory = path.join(process.cwd(), "logs", `${companyName}_${companyId}`);

  // Günlük döndürme işlemi
  const transport = new winston.transports.DailyRotateFile({
    dirname: logsDirectory, // Log dosyalarının depolanacağı dizin
    filename: `${companyName}_${companyId}-%DATE%.log`, // Log dosya adı
    datePattern: "YYYY-wo", // Haftalık olarak döndürmek için (wo: ISO haftası)
    zippedArchive: false, // Log dosyalarını sıkıştırmadan tutar
    maxFiles: "4w", // 4 hafta boyunca eski logları saklar
  });

  return winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.printf(({ level, message }) => {
        return `${timestampFormat()} [${level.toUpperCase()}]: ${message}`;
      })
    ),
    transports: [new winston.transports.Console(), transport],
  });
};

// loggerInfo fonksiyonu
export const loggerInfo = (companyName: string, companyId: number, type: string, functionName: string, adminUserId: number, msg: string | null) => {
  const logger = createLogger(companyName, companyId);
  logger.info(`Entities&Type: ${type} || Kullanıcı Admin Ismi: ${functionName} || Kullanıcı Admin Id: ${adminUserId} || Mesaj: ${msg}`);
};
