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
exports.AppUser = void 0;
const typeorm_1 = require("typeorm");
const Message_1 = require("./Message");
const AppUserFavoriteProduct_1 = require("./AppUserFavoriteProduct");
const ReportProduct_1 = require("./ReportProduct");
let AppUser = class AppUser extends typeorm_1.BaseEntity {
};
exports.AppUser = AppUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppUser.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], AppUser.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AppUser.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AppUser.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], AppUser.prototype, "phoneCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 1 }),
    __metadata("design:type", Number)
], AppUser.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], AppUser.prototype, "verify", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Message, (message) => message.appUser, { nullable: true }),
    __metadata("design:type", Array)
], AppUser.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReportProduct_1.ReportProduct, (rp) => rp.appUser, { nullable: true }),
    __metadata("design:type", Array)
], AppUser.prototype, "reportedProducts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => AppUserFavoriteProduct_1.AppUserFavoriteProduct, (aufp) => aufp.appUser, { nullable: true }),
    __metadata("design:type", Object)
], AppUser.prototype, "favoriteProducts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AppUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AppUser.prototype, "updatedAt", void 0);
exports.AppUser = AppUser = __decorate([
    (0, typeorm_1.Entity)()
], AppUser);
//# sourceMappingURL=AppUser.js.map