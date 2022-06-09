import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CategoryStatisticDto {
  @ApiProperty({ example: ['99f29076-b481-4ae6-916d-6cbc4c2fc2a9'] })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds: string[];

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @IsNotEmpty()
  fromPeriod: Date;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @IsNotEmpty()
  toPeriod: Date;
}
