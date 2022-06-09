import { BankEntity } from './entities';

export class BankMapper {
  mapBankEntityToBank(bank: BankEntity) {
    return { ...bank };
  }

  mapBankEntitiesToBanks(banks: BankEntity[]) {
    return banks.map((bank) => this.mapBankEntityToBank(bank));
  }
}
