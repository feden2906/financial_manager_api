import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { BankRepository } from './bank.repository';
import { CreateBankDto, UpdateBankDto } from './dto';
import { BankEntity } from './entities';

@Injectable()
export class BankService {
  constructor(private readonly bankRepository: BankRepository) {}
  async createBank(createBankDto: CreateBankDto): Promise<BankEntity> {
    const foundedBank = await this.bankRepository.findBankByName(
      createBankDto.name,
    );
    if (foundedBank) {
      throw new HttpException(
        `Bank with name ${createBankDto.name} is exists`,
        HttpStatus.CONFLICT,
      );
    }
    return await this.bankRepository.createBank(createBankDto);
  }

  async findAllBanks(): Promise<BankEntity[]> {
    return await this.bankRepository.findAllBanks();
  }

  async findBankById(id: string, relations?: string[]): Promise<BankEntity> {
    const bank = await this.bankRepository.getBankById(id, relations);
    if (!bank) {
      throw new BadRequestException(`Bank with ID "${id}" not found`);
    }
    return bank;
  }

  async findAndUpdateBank(
    bankId: string,
    updateBankDto: UpdateBankDto,
  ): Promise<BankEntity> {
    let bankEntity = await this.findBankById(bankId);
    bankEntity = Object.assign(bankEntity, updateBankDto);
    return await this.bankRepository.updateBank(bankEntity);
  }

  async updateBank(entity): Promise<BankEntity> {
    return await this.bankRepository.updateBank(entity);
  }

  async removeBank(bankId: string): Promise<void> {
    const bank = await this.findBankById(bankId);

    if (bank.transactions.length) {
      throw new BadRequestException(`Bank with ID ${bankId} has transactions`);
    }
    await this.bankRepository.removeBank(bankId);
  }
}
