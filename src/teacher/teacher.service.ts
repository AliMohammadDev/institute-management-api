import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { Teacher } from './entities/teacher.entity';
import { FindAllTeacherInput } from './dto/find-all-teacher.input';

import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { TeacherShared } from 'src/teacher-shared/entities/teacher-shared.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}
  public create(createTeacherInput: CreateTeacherInput) {
    const teacher = new Teacher();

    teacher.address = createTeacherInput.address;
    teacher.email = createTeacherInput.email;
    teacher.firstName = createTeacherInput.firstName;
    teacher.lastName = createTeacherInput.lastName;
    teacher.phone = createTeacherInput.phone;
    teacher.teacherShareds = createTeacherInput.sharedIds?.map((i) => {
      const teacherShared = new TeacherShared();
      teacherShared.appointmentId = i.appointmentId;
      teacherShared.groupId = i.groupId;
      teacherShared.studyMaterialId = i.studyMaterialId;
      teacherShared.teacher = teacher;

      return teacherShared;
    });
    return this.teacherRepository.save(teacher);
  }

  public findAll(filter: FindAllTeacherInput) {
    const query = this.teacherRepository.createQueryBuilder('teacher').where('true');
    generateQuerySorts<Teacher>(query, filter, Teacher, 'teacher');
    generateQueryConditions<Teacher>(query, filter, 'teacher');

    return paginate<Teacher, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  public findOne(
    teacherOptions: FindOptionsWhere<Teacher>,
    options?: {
      selected?: FindOptionsSelect<Teacher>;
      relations?: FindOptionsRelations<Teacher>;
    },
  ) {
    return this.teacherRepository.findOne({
      select: options?.selected,
      relations: options?.relations,
      where: teacherOptions,
    });
  }

  public async update(updateInput: UpdateTeacherInput) {
    await this.teacherRepository.update({ id: updateInput.id }, updateInput);
    return this.findOne({ id: updateInput.id });
  }

  public remove(id: number) {
    this.teacherRepository.delete(id);
  }
}
