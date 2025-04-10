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
exports.ReportProduct = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const AppUser_1 = require("./AppUser");
const Company_1 = require("./Company");
let ReportProduct = class ReportProduct extends typeorm_1.BaseEntity {
};
exports.ReportProduct = ReportProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReportProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReportProduct.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.reports),
    __metadata("design:type", Product_1.Product)
], ReportProduct.prototype, "reportedProduct", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AppUser_1.AppUser, (appUser) => appUser.reportedProducts),
    __metadata("design:type", AppUser_1.AppUser)
], ReportProduct.prototype, "appUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.reportedProducts),
    __metadata("design:type", Company_1.Company)
], ReportProduct.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ReportProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ReportProduct.prototype, "updatedAt", void 0);
exports.ReportProduct = ReportProduct = __decorate([
    (0, typeorm_1.Entity)()
], ReportProduct);
//# sourceMappingURL=ReportProduct.js.map