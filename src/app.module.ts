import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UrlModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.bjq33.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_CLUSTER}`,
      { dbName: process.env.DB_NAME },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
