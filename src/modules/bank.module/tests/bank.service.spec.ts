import { Test, TestingModule } from '@nestjs/testing';

import { CostEnum } from '../../../common';
import { Category } from '../../category.module/types';
import { Transaction } from '../../transaction.module/types';
import { BankRepository } from '../bank.repository';
import { BankService } from '../bank.service';
import { CreateBankDto, UpdateBankDto } from '../dto';
import { BankEntity } from '../entities';
import { Bank } from '../types';

describe('BankService', () => {
  let service: BankService;

  const mockBankId = '123e3567-e89b-12d3-2456-426614144000';

  const mockBankWithoutTransactionId = '123e3567-e89b-12d3-2456-23234144000';

  const mockFieldsToUpdateBank: UpdateBankDto = {
    balance: 222222,
    description: 'an existing updated bank',
    name: 'Updated-bank',
  };
  const mockCreateBankDto: CreateBankDto = {
    balance: 10000,
    description: 'new mock bank',
    name: 'Alfa-bank',
  };

  const mockCategory: Category = {
    id: '345e3567-e89b-12d3-2456-426614144789',
    name: 'transport',
  };

  const mockBank: Bank = {
    balance: 34234343434,
    createdAt: new Date(),
    description: 'test bank for testing',
    id: mockBankId,
    name: 'Test-bank',
    updatedAt: new Date(),
  };

  const mockTransaction: Transaction = {
    amount: 444,
    bank: mockBank,
    categories: [mockCategory],
    createdAt: new Date(),
    id: '454e4567-e89b-12d3-a456-676714174000',
    type: CostEnum.PROFITABLE,
    updatedAt: new Date(),
  };

  const mockBankEntity: BankEntity = {
    ...mockBank,
    transactions: [mockTransaction],
  };

  const mockBankEntityWithoutTransactions: BankEntity = {
    ...mockBank,
    id: mockBankWithoutTransactionId,
    transactions: [],
  };

  const mockBankRepository = {
    createBank: jest.fn((bankToSave: CreateBankDto): BankEntity => {
      if (bankToSave.name === mockCreateBankDto.name) {
        return mockBankEntity;
      }
      throw new Error();
    }),
    findAllBanks: jest.fn((): BankEntity[] => [mockBankEntity]),
    findBankByName: jest.fn((bankName: string): BankEntity => {
      if (bankName === mockBank.name) {
        return mockBankEntity;
      }
      return null;
    }),
    getBankById: jest.fn((id: string, relations?: string[]): BankEntity => {
      if (id === mockBankEntity.id) {
        return mockBankEntity;
      }
      if (id === mockBankEntityWithoutTransactions.id) {
        return mockBankEntityWithoutTransactions;
      }
      return null;
    }),
    removeBank: jest.fn((id: string): void => {
      if (id === mockBankId) {
        return undefined;
      }
      undefined;
    }),
    updateBank: jest.fn(
      (updateBankDto: UpdateBankDto, entity: BankEntity): BankEntity => {
        if (entity.id === mockBankEntity.id) {
          return { ...entity, ...updateBankDto };
        } else throw new Error();
      },
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: BankRepository,
          useValue: mockBankRepository,
        },
      ],
    }).compile();

    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and return new bank', async () => {
    expect(await service.createBank(mockCreateBankDto)).toEqual(mockBankEntity);
  });

  it('should throw http exception with code: 400', async () => {
    try {
      expect(
        await service.createBank({ ...mockCreateBankDto, name: mockBank.name }),
      ).toEqual(mockBankEntity);
    } catch (error: any) {
      expect(error.message).toBe(`Bank with name ${mockBank.name} is exists`);
    }
  });

  it('should find and return all existing banks', async () => {
    expect(await service.findAllBanks()).toEqual([mockBankEntity]);
  });

  it('should find and return one bank', async () => {
    expect(await service.findBankById(mockBankId)).toEqual(mockBankEntity);
  });

  it('should throw http exception with code: 400', async () => {
    try {
      expect(await service.findBankById('5464564565')).toEqual(mockBankEntity);
    } catch (error: any) {
      expect(error.message).toBe(`Bank with ID "5464564565" not found`);
    }
  });

  it('should update and return updated bank', async () => {
    expect(
      await service.findAndUpdateBank(mockBankId, mockFieldsToUpdateBank),
    ).toEqual({ ...mockBankEntity, ...mockFieldsToUpdateBank });
  });

  it('should remove bank and return undefined ', async () => {
    expect(await service.removeBank(mockBankWithoutTransactionId)).toBe(
      undefined,
    );
  });

  it('should throw exception', async () => {
    try {
      expect(await service.removeBank(mockBankId)).toEqual(undefined);
    } catch (error: any) {
      expect(error.message).toBe(`Bank with ID ${mockBankId} has transactions`);
    }
  });
});
