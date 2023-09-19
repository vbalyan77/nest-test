import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log({ uri: configService.get<string>('DB_URI') });
        try {
          const uri = configService.get<string>('DB_URI');
          console.log(`Trying to connect to database with URI: ${uri}`);
          return {
            uri,
          };
        } catch (error) {
          console.error('Error while connecting to the database', error);
          throw error;
        }
      },
      inject: [ConfigService],
    }),
    ProductModule,
  ],
})
export class AppModule {}
