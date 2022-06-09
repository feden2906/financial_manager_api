import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { BankPresenter } from './bank.presenter';
import { BankService } from './bank.service';
import {
  CreateBankDto,
  ResponseBankDto,
  ResponseBanksDto,
  UpdateBankDto,
} from './dto';

@ApiTags('Bank module')
@Controller('bank')
export class BankController {
  constructor(
    private readonly bankService: BankService,
    private readonly bankPresenter: BankPresenter,
  ) {}

  @ApiOperation({ summary: 'create new bank' })
  @ApiCreatedResponse({ type: ResponseBankDto })
  @Post()
  async createBank(
    @Body() createBankDto: CreateBankDto,
  ): Promise<ResponseBankDto> {
    const newBank = await this.bankService.createBank(createBankDto);
    return this.bankPresenter.mapBankResponse(newBank);
  }

  @ApiOperation({ summary: 'get many banks' })
  @ApiOkResponse({ type: ResponseBanksDto })
  @Get()
  async findAllBanks(): Promise<ResponseBanksDto> {
    const foundedBanks = await this.bankService.findAllBanks();
    return this.bankPresenter.mapMenuBankResponse(foundedBanks);
  }

  @ApiOperation({ summary: 'get bank by id' })
  @ApiOkResponse({ type: ResponseBankDto })
  @Get(':bankId')
  async findOneBank(
    @Param('bankId', new ParseUUIDPipe()) bankId: string,
  ): Promise<ResponseBankDto> {
    const foundedBank = await this.bankService.findBankById(bankId);
    return this.bankPresenter.mapBankResponse(foundedBank);
  }

  @ApiOperation({ summary: 'update bank by id' })
  @ApiCreatedResponse({ type: ResponseBankDto })
  @HttpCode(HttpStatus.CREATED)
  @Patch(':bankId')
  async updateBank(
    @Param('bankId', new ParseUUIDPipe()) bankId: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<ResponseBankDto> {
    const updatedBank = await this.bankService.findAndUpdateBank(
      bankId,
      updateBankDto,
    );
    return this.bankPresenter.mapBankResponse(updatedBank);
  }

  @ApiOperation({ summary: 'remove bank by id' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':bankId')
  async removeBank(
    @Param('bankId', new ParseUUIDPipe()) bankId: string,
  ): Promise<void> {
    await this.bankService.removeBank(bankId);
  }
}
