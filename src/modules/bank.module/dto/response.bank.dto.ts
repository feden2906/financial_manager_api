import { ApiProperty } from '@nestjs/swagger';

import { BankEntity } from '../entities';
import { Bank } from '../types';

class BaseResponseDto implements Partial<Bank> {
  @ApiProperty({
    description: 'bank description',
    example: 'super bank for everyman',
  })
  description: string;

  @ApiProperty({ description: 'bank name', example: 'Privat-Bank' })
  name: string;
}

export class ResponseBanksDto {
  @ApiProperty({ type: () => [BankEntity] })
  banks: BankEntity[];
}

export class ResponseBankDto {
  @ApiProperty({ type: () => BaseResponseDto })
  bank: BaseResponseDto;
}
