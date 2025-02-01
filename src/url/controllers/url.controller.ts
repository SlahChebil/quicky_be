/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IUrl } from '../interface/url.interface';

@Controller('url')
@ApiTags('Url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  @ApiBody({ type: CreateUrlDto })
  async shorten(
    @Body() createUrlDto: CreateUrlDto,
  ): Promise<Omit<IUrl, 'fullUrl'>> {
    return await this.urlService.shortenUrl(createUrlDto.fullUrl);
  }

  @Get(':shortUrl')
  async redirect(
    @Param('shortUrl')
    shortUrl: string,
  ): Promise<string> {
    return await this.urlService.getOriginalUrl(shortUrl);
  }
}
