import { Injectable } from '@nestjs/common';
import { CreateTeacherSharedInput } from './dto/create-teacher-shared.input';
import { UpdateTeacherSharedInput } from './dto/update-teacher-shared.input';

@Injectable()
export class TeacherSharedService {
  create(createTeacherSharedInput: CreateTeacherSharedInput) {
    return 'This action adds a new teacherShared';
  }

  findAll() {
    return `This action returns all teacherShared`;
  }

  findOne(id: number) {
    return `This action returns a #${id} teacherShared`;
  }

  update(id: number, updateTeacherSharedInput: UpdateTeacherSharedInput) {
    return `This action updates a #${id} teacherShared`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacherShared`;
  }
}
