"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const filters_1 = require("./core/filters");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("./config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new filters_1.CommonExceptionFilter(), new filters_1.MongoExceptionFilter(), new filters_1.HttpExceptionFilter());
    const document = swagger_1.SwaggerModule.createDocument(app, config_1.config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map