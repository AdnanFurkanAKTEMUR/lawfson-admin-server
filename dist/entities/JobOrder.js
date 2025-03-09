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
exports.JobOrder = void 0;
const typeorm_1 = require("typeorm");
const AdminUser_1 = require("./AdminUser");
const Company_1 = require("./Company");
let JobOrder = class JobOrder extends typeorm_1.BaseEntity {
};
exports.JobOrder = JobOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], JobOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobOrder.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AdminUser_1.AdminUser, (adminUser) => adminUser.adminJobs),
    __metadata("design:type", AdminUser_1.AdminUser)
], JobOrder.prototype, "adminUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AdminUser_1.AdminUser, (adminUser) => adminUser.createdAdminJobs),
    __metadata("design:type", AdminUser_1.AdminUser)
], JobOrder.prototype, "createdAdminUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.jobOrders),
    __metadata("design:type", Company_1.Company)
], JobOrder.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], JobOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], JobOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], JobOrder.prototype, "updatedAt", void 0);
exports.JobOrder = JobOrder = __decorate([
    (0, typeorm_1.Entity)()
], JobOrder);
//# sourceMappingURL=JobOrder.js.map