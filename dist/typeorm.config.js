"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = require("./entities/Product");
const Category_1 = require("./entities/Category");
const AdminUser_1 = require("./entities/AdminUser");
const Company_1 = require("./entities/Company");
const AppUser_1 = require("./entities/AppUser");
const Message_1 = require("./entities/Message");
const AdminNote_1 = require("./entities/AdminNote");
const JobOrder_1 = require("./entities/JobOrder");
const AppUserFavoriteProduct_1 = require("./entities/AppUserFavoriteProduct");
const ReportProduct_1 = require("./entities/ReportProduct");
dotenv_1.default.config();
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.POSTGRES_CONNECTION_STRING,
    entities: [Product_1.Product, Category_1.Category, AdminUser_1.AdminUser, Company_1.Company, AppUser_1.AppUser, Message_1.Message, AdminNote_1.AdminNote, JobOrder_1.JobOrder, AppUserFavoriteProduct_1.AppUserFavoriteProduct, ReportProduct_1.ReportProduct],
    synchronize: true,
});
//# sourceMappingURL=typeorm.config.js.map