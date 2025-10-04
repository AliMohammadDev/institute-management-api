import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassLevelInput } from './dto/create-class-level.input';
import { UpdateClassLevelInput } from './dto/update-class-level.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassLevel } from './entities/class-level.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';
import { findAllClassLevelInput } from './dto/find-all-class-level.input';

@Injectable()
export class ClassLevelService {
  constructor(
    @InjectRepository(ClassLevel)
    private readonly classLevelRepository: Repository<ClassLevel>,
  ) {}
  create(createClassLevelInput: CreateClassLevelInput) {
    const newClassLevel = this.classLevelRepository.create(createClassLevelInput);
    return this.classLevelRepository.save(newClassLevel);
  }

  public findAll(filter: findAllClassLevelInput) {
    const query = this.classLevelRepository
      .createQueryBuilder('classLevel')
      .leftJoinAndSelect('classLevel.groups', 'group')
      .leftJoinAndSelect('group.students', 'student')
      .where('true');

    generateQuerySorts<ClassLevel>(query, filter, ClassLevel, 'classLevel');

    generateQueryConditions<ClassLevel>(query, filter, 'classLevel');

    return paginate<ClassLevel, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  findOne(
    classLevelOptions: FindOptionsWhere<ClassLevel>,
    options?: {
      selected?: FindOptionsSelect<ClassLevel>;
      relations?: FindOptionsRelations<ClassLevel>;
    },
  ) {
    const classLevel = this.classLevelRepository.findOne({
      where: classLevelOptions,
      select: options?.selected,
      relations: options?.relations ?? { groups: { students: true } },
    });
    return classLevel;
  }

  public update(updateClassLevelInput: UpdateClassLevelInput) {
    this.classLevelRepository.update({ id: updateClassLevelInput.id }, updateClassLevelInput);

    return this.findOne({ id: updateClassLevelInput.id });
  }

  async remove(id: number) {
    this.classLevelRepository.delete(id);
  }
}
