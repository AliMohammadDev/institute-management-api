import { Module } from '@nestjs/common';
import { TeacherSharedService } from './teacher-shared.service';
import { TeacherSharedResolver } from './teacher-shared.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherShared } from './entities/teacher-shared.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherShared])],
  providers: [TeacherSharedResolver, TeacherSharedService],
})
export class TeacherSharedModule {}
