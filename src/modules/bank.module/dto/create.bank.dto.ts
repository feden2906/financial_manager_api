import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

import { Bank } from '../types';

export class CreateBankDto
  implements Pick<Bank, 'name' | 'balance' | 'description'>
{
  @ApiProperty({ description: 'bank balance', example: 500 })
  @IsNotEmpty()
  balance: number;

  @ApiProperty({
    description: 'bank description',
    example: 'super bank for everyman',
  })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'bank name', example: 'Privat-Bank' })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  name: string;
}
