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
exports.SystemLog = exports.TableName = exports.ActionType = void 0;
const typeorm_1 = require("typeorm");
const AdminUser_1 = require("./AdminUser");
var ActionType;
(function (ActionType) {
    ActionType["Delete"] = "delete";
    ActionType["Create"] = "create";
    ActionType["Read"] = "read";
    ActionType["Update"] = "update";
})(ActionType || (exports.ActionType = ActionType = {}));
var TableName;
(function (TableName) {
    TableName["AdminNote"] = "AdminNote";
    TableName["AdminUser"] = "AdminUser";
    TableName["AppUser"] = "AppUser";
    TableName["Category"] = "Category";
    TableName["Company"] = "Company";
    TableName["Message"] = "Message";
    TableName["Product"] = "Product";
})(TableName || (exports.TableName = TableName = {}));
let SystemLog = class SystemLog extends typeorm_1.BaseEntity {
};
exports.SystemLog = SystemLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SystemLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: ActionType }),
    __metadata("design:type", String)
], SystemLog.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: TableName }),
    __metadata("design:type", String)
], SystemLog.prototype, "tableName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SystemLog.prototype, "before", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SystemLog.prototype, "later", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AdminUser_1.AdminUser, (adminUser) => adminUser.systemLogs),
    __metadata("design:type", AdminUser_1.AdminUser)
], SystemLog.prototype, "adminUser", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SystemLog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SystemLog.prototype, "updatedAt", void 0);
exports.SystemLog = SystemLog = __decorate([
    (0, typeorm_1.Entity)()
], SystemLog);
//# sourceMappingURL=SystemLog.js.map