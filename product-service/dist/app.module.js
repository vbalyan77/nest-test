"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const product_module_1 = require("./modules/product/product.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    console.log({ uri: configService.get('DB_URI') });
                    try {
                        const uri = configService.get('DB_URI');
                        console.log(`Trying to connect to database with URI: ${uri}`);
                        return {
                            uri,
                        };
                    }
                    catch (error) {
                        console.error('Error while connecting to the database', error);
                        throw error;
                    }
                },
                inject: [config_1.ConfigService],
            }),
            product_module_1.ProductModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map