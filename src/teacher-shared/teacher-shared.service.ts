import { Injectable } from '@nestjs/common';
import { FindAllTeacherSharedInput } from './dto/find-all-teacher-shared.input';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { TeacherShared } from './entities/teacher-shared.entity';
import { UpdateTeacherSharedInput } from './dto/update-teacher-shared.input';
import { CreateTeacherSharedInput } from './dto/create-teacher-shared.input';
@Injectable()
export class TeacherSharedService {
  constructor(
    @InjectRepository(TeacherShared)
    private readonly TeacherSharedRepository: Repository<TeacherShared>,
  ) {}
  public create(createTeacherSharedInput: CreateTeacherSharedInput) {
    return 'This action adds a new TeacherShared';
  }

  public findAll(filter: FindAllTeacherSharedInput) {
    const query = this.TeacherSharedRepository.createQueryBuilder('teacher_Shared').where('true');
    generateQuerySorts<TeacherShared>(query, filter, TeacherShared, 'Teacher_shared');
    generateQueryConditions<TeacherShared>(query, filter, 'Teacher_shared');

    return paginate<TeacherShared, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }
  public findOne(
    TeacherSharedOptions: FindOptionsWhere<TeacherShared>,
    options?: {
      selected?: FindOptionsSelect<TeacherShared>;
      relations?: FindOptionsRelations<TeacherShared>;
    },
  ) {
    return this.TeacherSharedRepository.findOne({
      select: options?.selected,
      relations: options?.relations,
      where: TeacherSharedOptions,
    });
  }

  public async update(updateTeacherSharedInput: UpdateTeacherSharedInput) {
    await this.TeacherSharedRepository.update({ id: updateTeacherSharedInput.id }, updateTeacherSharedInput);
    return this.findOne({ id: updateTeacherSharedInput.id });
  }

  public remove(id: number) {
    this.TeacherSharedRepository.delete(id);
  }
}
