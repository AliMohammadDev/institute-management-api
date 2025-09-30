import { Module } from '@nestjs/common';
import { DdService } from './dd.service';
import { DdResolver } from './dd.resolver';

@Module({
  providers: [DdResolver, DdService],
})
export class DdModule {}
