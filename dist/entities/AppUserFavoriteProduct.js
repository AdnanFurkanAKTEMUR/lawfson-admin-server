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
exports.AppUserFavoriteProduct = void 0;
const typeorm_1 = require("typeorm");
const AppUser_1 = require("./AppUser");
const Product_1 = require("./Product");
let AppUserFavoriteProduct = class AppUserFavoriteProduct extends typeorm_1.BaseEntity {
};
exports.AppUserFavoriteProduct = AppUserFavoriteProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppUserFavoriteProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AppUser_1.AppUser, (appUser) => appUser.favoriteProducts),
    __metadata("design:type", AppUser_1.AppUser)
], AppUserFavoriteProduct.prototype, "appUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.onFavorites),
    __metadata("design:type", Product_1.Product)
], AppUserFavoriteProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AppUserFavoriteProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AppUserFavoriteProduct.prototype, "updatedAt", void 0);
exports.AppUserFavoriteProduct = AppUserFavoriteProduct = __decorate([
    (0, typeorm_1.Entity)()
], AppUserFavoriteProduct);
//# sourceMappingURL=AppUserFavoriteProduct.js.map