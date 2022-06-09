import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankController } from './bank.controller';
import { BankMapper } from './bank.mapper';
import { BankPresenter } from './bank.presenter';
import { BankRepository } from './bank.repository';
import { BankService } from './bank.service';
import { BankEntity } from './entities';

@Module({
  controllers: [BankController],
  exports: [BankService],
  imports: [TypeOrmModule.forFeature([BankEntity])],
  providers: [BankService, BankRepository, BankPresenter, BankMapper],
})
export class BankModule {}
