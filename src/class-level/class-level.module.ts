import { Module } from '@nestjs/common';
import { ClassLevelService } from './class-level.service';
import { ClassLevelResolver } from './class-level.resolver';
import { ClassLevel } from './entities/class-level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ClassLevel])],
  providers: [ClassLevelResolver, ClassLevelService],
  exports: [ClassLevelService],
})
export class ClassLevelModule {}
