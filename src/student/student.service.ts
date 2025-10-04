import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { FindAllStudentInput } from './dto/find-all-student.input';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  public async create(createStudentInput: CreateStudentInput) {
    const student = this.studentRepository.create(createStudentInput);
    await this.studentRepository.save(student);

    return this.findOne({ id: student.id });
  }

  public findAll(filter: FindAllStudentInput) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.group', 'group')
      .leftJoinAndSelect('group.classLevel', 'classLevel')
      .where('true');

    generateQuerySorts<Student>(query, filter, Student, 'student');

    generateQueryConditions<Student>(query, filter, 'student');

    return paginate<Student, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  public findOne(
    studentOptions: FindOptionsWhere<Student>,
    options?: {
      selected?: FindOptionsSelect<Student>;
      relations?: FindOptionsRelations<Student>;
    },
  ) {
    const student = this.studentRepository.findOne({
      where: studentOptions,
      select: options?.selected,
      relations: options?.relations ?? { group: { classLevel: true } },
    });
    return student;
  }

  public async update(updateStudentInput: UpdateStudentInput) {
    await this.studentRepository.update({ id: updateStudentInput.id }, updateStudentInput);

    return this.findOne({ id: updateStudentInput.id });
  }

  public remove(id: number) {
    this.studentRepository.delete(id);
  }
}
