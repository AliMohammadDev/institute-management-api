import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassLevelInput } from './dto/create-class-level.input';
import { UpdateClassLevelInput } from './dto/update-class-level.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassLevel } from './entities/class-level.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { FindAllUserInput } from 'src/user/dto/find-all-user.input';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ClassLevelService {
  constructor(
    @InjectRepository(ClassLevel)
    private readonly classLevelRepository: Repository<ClassLevel>,
  ) {}
  async create(createClassLevelInput: CreateClassLevelInput): Promise<ClassLevel> {
    const newClassLevel = this.classLevelRepository.create(createClassLevelInput);
    return await this.classLevelRepository.save(newClassLevel);
  }

  async findAll(filter: FindAllUserInput) {
    const query = this.classLevelRepository.createQueryBuilder('classLevel').where('true');

    generateQuerySorts<ClassLevel>(query, filter, ClassLevel, 'classLevel');

    generateQueryConditions<ClassLevel>(query, filter, 'classLevel');

    return paginate<ClassLevel, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  async findOne(
    classLevelOptions: FindOptionsWhere<ClassLevel>,
    options?: {
      selected?: FindOptionsSelect<ClassLevel>;
      relations?: FindOptionsRelations<ClassLevel>;
    },
  ): Promise<ClassLevel | null> {
    const classLevel = await this.classLevelRepository.findOne({
      where: classLevelOptions,
      select: options?.selected,
      relations: options?.relations,
    });
    return classLevel || null;
  }

  async update(updateClassLevelInput: UpdateClassLevelInput): Promise<ClassLevel | null> {
    const classLevel = await this.classLevelRepository.update({ id: updateClassLevelInput.id }, updateClassLevelInput);
    if (!classLevel) return null;
    return this.findOne({ id: updateClassLevelInput.id });
  }

  async remove(classLevelId: number): Promise<ClassLevel | null> {
    const classLevel = await this.findOne({ id: classLevelId });
    if (!classLevel) return null;
    await this.classLevelRepository.delete(classLevelId);
    return classLevel;
  }
}
