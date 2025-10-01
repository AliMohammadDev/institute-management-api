import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate } from "nestjs-typeorm-paginate";
import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { CreateTeacherInput } from "./dto/create-teacher.input";
import { UpdateTeacherInput } from "./dto/update-teacher.input";
import { Teacher } from "./entities/teacher.entity";
import { FindAllTeacherInput } from "./dto/find-all-teacher.input";


import {
  generateQueryConditions,
  generateQuerySorts,
  metaTransformer,
} from "src/shared/helpers";
import { PaginationMetadata } from "src/shared/types/pagination-metadata";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}
  public create(createInput: CreateTeacherInput) {
    const entity = this.teacherRepository.create(createInput);
    return this.teacherRepository.save(entity);
  }

  public findAll(filter: FindAllTeacherInput) {
    const query = this.teacherRepository
      .createQueryBuilder("teacher")
      .where("true");
    generateQuerySorts<Teacher>(query, filter, Teacher, "teacher");
    generateQueryConditions<Teacher>(query, filter, "teacher");

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

  public remove(id: string) {
    this.teacherRepository.delete(id);
  }
}