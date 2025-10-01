import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { FindOptionsRelations, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { FindAllGroupInput } from './dto/find-all-group.input';
import { PaginationMetadata } from 'src/shared/types/pagination-metadata';
import { paginate } from 'nestjs-typeorm-paginate';
import { generateQueryConditions, generateQuerySorts, metaTransformer } from 'src/shared/helpers';
import { ClassLevelService } from 'src/class-level/class-level.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly classLevelService: ClassLevelService,
  ) {}
  async create(createGroupInput: CreateGroupInput): Promise<Group | null> {
    const { classLevelId, name } = createGroupInput;

    const classLevel = await this.classLevelService.findOne({ id: classLevelId });
    if (!classLevel) throw new NotFoundException('ClassLevel not found');

    const group = this.groupRepository.create({ name, classLevel });
    return await this.groupRepository.save(group);
  }

  async findAll(filter: FindAllGroupInput) {
    const query = this.groupRepository.createQueryBuilder('group').where('true');

    generateQuerySorts<Group>(query, filter, Group, 'group');

    generateQueryConditions<Group>(query, filter, 'group');

    return paginate<Group, PaginationMetadata>(query, {
      limit: filter.pagination.limit,
      page: filter.pagination.page,
      metaTransformer,
    });
  }
  async findOne(
    groupOptions: FindOptionsWhere<Group>,
    options?: {
      selected?: FindOptionsSelect<Group>;
      relations?: FindOptionsRelations<Group>;
    },
  ): Promise<Group | null> {
    const group = await this.groupRepository.findOne({
      where: groupOptions,
      select: options?.selected,
      relations: options?.relations,
    });
    return group || null;
  }

  async update(updateGroupInput: UpdateGroupInput): Promise<Group | null> {
    const group = await this.findOne({ id: updateGroupInput.id }, { relations: { classLevel: true } });
    if (!group) return null;
    if (updateGroupInput.classLevelId) {
      const newClassLevel = await this.classLevelService.findOne({ id: updateGroupInput.classLevelId });
      if (!newClassLevel) {
        throw new NotFoundException(`ClassLevel #${updateGroupInput.classLevelId} not found`);
      }
      group.classLevel = newClassLevel;
    }
    if (updateGroupInput.name !== undefined) {
      group.name = updateGroupInput.name;
    }
    return await this.groupRepository.save(group);
  }

  async remove(groupId: number): Promise<Group | null> {
    const group = await this.findOne({ id: groupId }, { relations: { classLevel: true } });
    if (!group) return null;
    await this.groupRepository.delete(groupId);
    return group;
  }
}
