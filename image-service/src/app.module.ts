import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageModule } from './modules/image/image.module';

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
    ImageModule,
  ],
})
export class AppModule {}
