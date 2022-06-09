import { Injectable } from '@nestjs/common';

@Injectable()
export class BankPresenter {
  mapBankResponse(bank) {
    return { bank };
  }

  mapMenuBankResponse(banks) {
    return { banks };
  }
}
