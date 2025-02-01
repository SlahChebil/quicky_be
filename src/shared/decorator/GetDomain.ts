import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { URL } from 'url';

export const ExtractDomain = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): string => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = ctx.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const longUrl = request.body?.longUrl;

    if (!longUrl) {
      throw new BadRequestException('longUrl is required.');
    }

    try {
      const urlObj = new URL(longUrl);
      return urlObj.hostname; // Extracts the domain (e.g., "example.com")
    } catch (error:any) {
      throw new BadRequestException('Invalid URL provided.');
    }
  },
);
