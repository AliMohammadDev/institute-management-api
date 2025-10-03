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
  public create(createStudyMaterialInput: CreateStudyMaterialInput) {
    const material = this.studyMaterialRepository.create(createStudyMaterialInput);
    return this.studyMaterialRepository.save(material);
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

  public async update(updateStudyMaterialInput: UpdateStudyMaterialInput) {
    await this.studyMaterialRepository.update({ id: updateStudyMaterialInput.id }, updateStudyMaterialInput);
    return this.findOne({ id: updateStudyMaterialInput.id });
  }

  public remove(id: number) {
    this.studyMaterialRepository.delete(id);
  }
}
