import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config/config';
import { DatabaseConfig } from './config/database.config';
import {
  BankModule,
  CategoryModule,
  StatisticModule,
  TransactionModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `configs/${
        process.env.NODE_ENV ? process.env.NODE_ENV : 'local'
      }.env`,
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    BankModule,
    TransactionModule,
    CategoryModule,
    StatisticModule,
  ],
})
export class AppModule {}
