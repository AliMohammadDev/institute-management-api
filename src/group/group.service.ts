import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { FindAllGroupInput } from './dto/find-all-group.input';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { ClassLevel } from 'src/class-level/entities/class-level.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  create(createGroupInput: CreateGroupInput) {
    const group = this.groupRepository.create(createGroupInput);
    return this.groupRepository.save(group);
  }

  public findAll(filter: FindAllGroupInput) {
    const query = this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.classLevel', 'classLevel')
      .where('true');

    generateQuerySorts<Group>(query, filter, Group, 'group');

    generateQueryConditions<Group>(query, filter, 'group');

    return paginate<Group, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }
  public findOne(
    groupOptions: FindOptionsWhere<Group>,
    options?: {
      selected?: FindOptionsSelect<Group>;
      relations?: FindOptionsRelations<Group>;
    },
  ) {
    const group = this.groupRepository.findOne({
      where: groupOptions,
      select: options?.selected,
      relations: options?.relations ?? { classLevel: true },
    });
    return group;
  }

  public async update(updateGroupInput: UpdateGroupInput) {
    await this.groupRepository.update({ id: updateGroupInput.id }, updateGroupInput);

    return this.findOne({ id: updateGroupInput.id });
  }

  public remove(id: number) {
    this.groupRepository.delete(id);
  }
}
