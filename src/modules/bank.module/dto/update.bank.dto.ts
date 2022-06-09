import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateBankDto {
  @ApiProperty({ description: 'bank balance', example: 500 })
  @IsNotEmpty()
  balance?: number;

  @ApiProperty({
    description: 'bank description',
    example: 'super bank fo everyman',
  })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ description: 'bank name', example: 'Privat-Bank' })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  name?: string;
}
