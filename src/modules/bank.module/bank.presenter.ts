import { Injectable } from '@nestjs/common';

import { ResponseBankDto } from './dto';

@Injectable()
export class BankPresenter {
  mapBankResponse(bank): ResponseBankDto {
    return {
      bank: {
        description: bank.description,
        // id: bank.id,
        name: bank.name,
      },
    };
  }

  mapMenuBankResponse(banks) {
    return { banks };
  }
}
