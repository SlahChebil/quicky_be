import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { IsHttpUrl } from 'src/shared/decorator/IsHttp';

export class CreateUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl()
  @IsHttpUrl({ message: 'URL must start with http:// or https://' })
  fullUrl: string;
}