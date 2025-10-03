import { Module } from '@nestjs/common';
import { TeacherSharedService } from './teacher-shared.service';
import { TeacherSharedResolver } from './teacher-shared.resolver';

@Module({
  providers: [TeacherSharedResolver, TeacherSharedService],
})
export class TeacherSharedModule {}
