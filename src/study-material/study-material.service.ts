import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';

import { CreateStudyMaterialInput } from './dto/create-study-material.input';
import { UpdateStudyMaterialInput } from './dto/update-study-material.input';
import { StudyMaterial } from './entities/study-material.entity';
import { FindAllStudyMaterialInput } from './dto/find-all-study-material.input';

import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';

@Injectable()
export class StudyMaterialService {
  constructor(
    @InjectRepository(StudyMaterial)
    private readonly studyMaterialRepository: Repository<StudyMaterial>,
  ) {}
  public create(createInput: CreateStudyMaterialInput) {
    const entity = this.studyMaterialRepository.create(createInput);
    return this.studyMaterialRepository.save(entity);
  }

  public findAll(filter: FindAllStudyMaterialInput) {
    const query = this.studyMaterialRepository.createQueryBuilder('study-material').where('true');
    generateQuerySorts<StudyMaterial>(query, filter, StudyMaterial, 'study-material');
    generateQueryConditions<StudyMaterial>(query, filter, 'study-material');

    return paginate<StudyMaterial, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }

  public findOne(
    studyMaterialOptions: FindOptionsWhere<StudyMaterial>,
    options?: {
      selected?: FindOptionsSelect<StudyMaterial>;
      relations?: FindOptionsRelations<StudyMaterial>;
    },
  ) {
    return this.studyMaterialRepository.findOne({
      select: options?.selected,
      relations: options?.relations,
      where: studyMaterialOptions,
    });
  }

  public async update(updateInput: UpdateStudyMaterialInput) {
    await this.studyMaterialRepository.update({ id: updateInput.id }, updateInput);
    return this.findOne({ id: updateInput.id });
  }

  public remove(id: string) {
    this.studyMaterialRepository.delete(id);
  }
}
