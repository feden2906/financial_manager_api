import { ApiProperty } from '@nestjs/swagger';

import { BankEntity } from '../entities';

export class ResponseBanksDto {
  @ApiProperty({ type: () => [BankEntity] })
  banks: BankEntity[];
}

export class ResponseBankDto {
  @ApiProperty({ type: () => BankEntity })
  bank: BankEntity;
}
