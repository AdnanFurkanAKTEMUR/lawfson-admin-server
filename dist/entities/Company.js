"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const AdminUser_1 = require("./AdminUser");
const Product_1 = require("./Product");
const Message_1 = require("./Message");
const JobOrder_1 = require("./JobOrder");
const ReportProduct_1 = require("./ReportProduct");
let Company = class Company extends typeorm_1.BaseEntity {
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "companyEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Company.prototype, "companyPhone", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdminUser_1.AdminUser, (adminuser) => adminuser.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "adminUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobOrder_1.JobOrder, (jobOrder) => jobOrder.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "jobOrders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportProduct_1.ReportProduct, (rp) => rp.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "reportedProducts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
//# sourceMappingURL=Company.js.map