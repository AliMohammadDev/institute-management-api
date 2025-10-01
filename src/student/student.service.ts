import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { GroupService } from 'src/group/group.service';
import { FindAllStudentInput } from './dto/find-all-student.input';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly groupService: GroupService,
  ) {}
  async create(createStudentInput: CreateStudentInput) {
    const { groupId, dateOfBirth, ...rest } = createStudentInput;

    const group = await this.groupService.findOne({ id: groupId });
    if (!group) throw new NotFoundException('Group not found');

    const student = this.studentRepository.create({
      ...rest,
      dateOfBirth: new Date(dateOfBirth),
      group,
    });
    return await this.studentRepository.save(student);
  }

  async findAll(filter: FindAllStudentInput) {
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

  async findOne(
    groupOptions: FindOptionsWhere<Student>,
    options?: {
      selected?: FindOptionsSelect<Student>;
      relations?: FindOptionsRelations<Student>;
    },
  ): Promise<Student | null> {
    const student = await this.studentRepository.findOne({
      where: groupOptions,
      select: options?.selected,
      relations: options?.relations ?? { group: true },
    });
    return student || null;
  }

  async update(updateStudentInput: UpdateStudentInput): Promise<Student | null> {
    const student = await this.findOne({ id: updateStudentInput.id }, { relations: { group: true } });
    if (!student) return null;

    const { groupId, ...rest } = updateStudentInput;
    Object.assign(student, rest);

    if (groupId) {
      const newGroup = await this.groupService.findOne({ id: groupId });
      if (!newGroup) {
        throw new NotFoundException(`ClassLevel #${groupId} not found`);
      }
      student.group = newGroup;
    }

    return await this.studentRepository.save(student);
  }

  async remove(studentId: number): Promise<Student | null> {
    const group = await this.findOne({ id: studentId }, { relations: { group: { classLevel: true } } });
    if (!group) return null;
    await this.studentRepository.delete(studentId);
    return group;
  }
}
