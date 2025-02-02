import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from 'src/schema/url.schema';
import * as shortid from 'shortid';
import { ERROR_MESSAGES } from 'src/shared/constants/errors';
import { IUrl } from '../interface/url.interface';
import { isBlockedDomain } from 'src/utils/blockDomains';

@Injectable()
export class UrlService {
    constructor(
        @InjectModel(Url.name) private readonly urlModel: Model<Url>
    ) {}

    async shortenUrl(fullUrl: string,origin : string): Promise<Omit<IUrl, 'fullUrl'>> {
        if(isBlockedDomain(fullUrl)){
            throw new NotFoundException(ERROR_MESSAGES.BLOCKED_DOMAIN);
        }
        const shortUrl = shortid.generate();
        const newUrl = new this.urlModel({ fullUrl, shortUrl });
        await newUrl.save();
        return {shortUrl: `${origin}/${shortUrl}`};
    }

    async getOriginalUrl(shortUrl: string): Promise<{
        fullUrl: string;
    }> {
        const urlEntry = await this.urlModel.findOne({ shortUrl });
        if (!urlEntry) throw new NotFoundException(ERROR_MESSAGES.URL_NOT_FOUND);
        urlEntry.clicks++;
        await urlEntry.save();
        return {fullUrl : urlEntry.fullUrl};
    }
}
