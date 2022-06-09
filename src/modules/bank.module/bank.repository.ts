import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BankMapper } from './bank.mapper';
import { CreateBankDto } from './dto';
import { BankEntity } from './entities';

@Injectable()
export class BankRepository {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
    readonly bankMapper: BankMapper,
  ) {}

  async getBankById(id: string, relations?: string[]): Promise<BankEntity> {
    return await this.bankRepository.findOne({
      relations,
      where: { id },
    });
  }

  async findBankByName(bankName: string): Promise<BankEntity> {
    const foundedBank = await this.bankRepository.findOne({
      where: {
        name: bankName,
      },
    });
    return foundedBank
      ? this.bankMapper.mapBankEntityToBank(foundedBank)
      : null;
  }

  async createBank(bankToSave: CreateBankDto): Promise<BankEntity> {
    const newBank = await this.bankRepository.save(bankToSave);
    return newBank ? this.bankMapper.mapBankEntityToBank(newBank) : null;
  }

  async findAllBanks(): Promise<BankEntity[]> {
    const foundedBanks = await this.bankRepository.find();
    return this.bankMapper.mapBankEntitiesToBanks(foundedBanks);
  }

  async updateBank(bankEntity): Promise<BankEntity> {
    return this.bankRepository.save(bankEntity);
  }

  async removeBank(id: string): Promise<void> {
    await this.bankRepository.delete(id);
  }
}
