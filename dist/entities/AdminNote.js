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
exports.AdminNote = void 0;
const typeorm_1 = require("typeorm");
const AdminUser_1 = require("./AdminUser");
const Company_1 = require("./Company");
const Message_1 = require("./Message");
let AdminNote = class AdminNote extends typeorm_1.BaseEntity {
};
exports.AdminNote = AdminNote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AdminNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AdminNote.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AdminUser_1.AdminUser, (adminUser) => adminUser.adminNotes),
    __metadata("design:type", AdminUser_1.AdminUser)
], AdminNote.prototype, "adminUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Message_1.Message, (message) => message.adminNotes),
    __metadata("design:type", Message_1.Message)
], AdminNote.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Company_1.Company, (company) => company.messages),
    __metadata("design:type", Company_1.Company)
], AdminNote.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdminNote.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AdminNote.prototype, "updatedAt", void 0);
exports.AdminNote = AdminNote = __decorate([
    (0, typeorm_1.Entity)()
], AdminNote);
//# sourceMappingURL=AdminNote.js.map