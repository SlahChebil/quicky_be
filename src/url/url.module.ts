import { Module } from '@nestjs/common';
import { UrlService } from './services/url.service';
import { UrlController } from './controllers/url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema } from 'src/schema/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema
      }
    ])
  ],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
