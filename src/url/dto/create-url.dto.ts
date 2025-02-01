import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  fullUrl: string;
}