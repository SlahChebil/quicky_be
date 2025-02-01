import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Url } from 'src/schema/url.schema';

const mockUrl = { longUrl: 'https://example.com', shortUrl: 'abc123' };

describe('UrlService', () => {
  let service: UrlService;
  let model: Model<Url>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getModelToken(Url.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockUrl),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UrlService>(UrlService);
    model = module.get<Model<Url>>(getModelToken(Url.name));
  });

  it('should shorten a valid URL', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockUrl as any);
    const result = await service.shortenUrl('https://example.com');
    expect(result).toBe('abc123');
  });

  it('should throw an error for invalid URL', async () => {
    await expect(service.shortenUrl('invalid_url')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return original URL for a valid short URL', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUrl as any);
    const result = await service.getOriginalUrl('abc123');
    expect(result).toBe('https://example.com');
  });

  it('should throw NotFoundException for a non-existent short URL', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);
    await expect(service.getOriginalUrl('nonexistent')).rejects.toThrow(
      NotFoundException,
    );
  });
});
