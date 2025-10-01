import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { ClassLevelService } from 'src/class-level/class-level.service';
import { ClassLevelModule } from 'src/class-level/class-level.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), ClassLevelModule],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}
