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
exports.AdminUser = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const Company_1 = require("./Company");
const Message_1 = require("./Message");
const AdminNote_1 = require("./AdminNote");
const JobOrder_1 = require("./JobOrder");
var UserRole;
(function (UserRole) {
    UserRole["Regular"] = "regular";
    UserRole["Admin"] = "admin";
    UserRole["SuperAdmin"] = "superadmin";
})(UserRole || (exports.UserRole = UserRole = {}));
let AdminUser = class AdminUser extends typeorm_1.BaseEntity {
};
exports.AdminUser = AdminUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminUser.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AdminUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], AdminUser.prototype, "isRoot", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.Regular,
    }),
    __metadata("design:type", String)
], AdminUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], AdminUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.adminUsers),
    __metadata("design:type", Company_1.Company)
], AdminUser.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.returnedAdmin, { nullable: true }),
    __metadata("design:type", Array)
], AdminUser.prototype, "returnedMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AdminNote_1.AdminNote, (adminNote) => adminNote.adminUser, { nullable: true }),
    __metadata("design:type", Array)
], AdminUser.prototype, "adminNotes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobOrder_1.JobOrder, (jobOrder) => jobOrder.adminUser, { nullable: true }),
    __metadata("design:type", Array)
], AdminUser.prototype, "adminJobs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobOrder_1.JobOrder, (jobOrder) => jobOrder.createdAdminUser, { nullable: true }),
    __metadata("design:type", Array)
], AdminUser.prototype, "createdAdminJobs", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdminUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdminUser.prototype, "updatedAt", void 0);
exports.AdminUser = AdminUser = __decorate([
    (0, typeorm_1.Entity)()
], AdminUser);
//# sourceMappingURL=AdminUser.js.map