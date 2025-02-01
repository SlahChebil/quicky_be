import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UrlService } from '../services/url.service';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [
        {
          provide: UrlService,
          useValue: {
            shortenUrl: jest.fn(),
            getOriginalUrl: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
    service = module.get<UrlService>(UrlService);
  });

  it('should return a shortened URL', async () => {
    jest.spyOn(service, 'shortenUrl').mockResolvedValue({ shortUrl: 'abc123' });
    const result = await controller.shorten({fullUrl: 'https://example.com'});
    expect(result).toEqual({ shortUrl: 'http://localhost:3000/url/abc123' });
  });

  it('should throw BadRequestException for invalid URL', async () => {
    jest
      .spyOn(service, 'shortenUrl')
      .mockRejectedValue(new BadRequestException('Invalid URL format'));
    await expect(
      controller.shorten({ fullUrl: 'invalid_url' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should redirect to the original URL', async () => {
    jest
      .spyOn(service, 'getOriginalUrl')
      .mockResolvedValue('https://example.com');

    const mockResponse = {
      redirect: jest.fn(),
    } as any;

    await controller.redirect('https://example.com');
    expect(mockResponse.redirect).toHaveBeenCalledWith(
      302,
      'https://example.com',
    );
  });

  it('should throw NotFoundException for an unknown short URL', async () => {
    jest
      .spyOn(service, 'getOriginalUrl')
      .mockRejectedValue(new NotFoundException('Short URL not found'));

    await expect(controller.redirect('nonexistent')).rejects.toThrow(
      NotFoundException,
    );
  });
});
