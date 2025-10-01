import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { NotFoundException } from '@nestjs/common';
import { GroupPaginationResultOutput } from './dto/find-all-group.output';
import { FindAllGroupInput } from './dto/find-all-group.input';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => GroupPaginationResultOutput, { name: 'groups' })
  public findAll(@Args('filter') filter: FindAllGroupInput) {
    return this.groupService.findAll(filter);
  }
  @Query(() => Group, { name: 'group' })
  async findOne(@Args('groupId', { type: () => Int }) groupId: number) {
    const group = await this.groupService.findOne({ id: groupId }, { relations: { classLevel: true } });
    if (!group) {
      throw new NotFoundException(`ClassLevel #${groupId} not found`);
    }
    return group;
  }

  @Mutation(() => Group)
  async updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    const group = await this.groupService.update(updateGroupInput);
    if (!group) {
      throw new NotFoundException(`ClassLevel #${updateGroupInput.id} not found`);
    }
    return group;
  }

  @Mutation(() => Group)
  removeGroup(@Args('groupId', { type: () => Int }) groupId: number) {
    const group = this.groupService.remove(groupId);
    if (!group) {
      throw new NotFoundException(`Group #${groupId} not found`);
    }
    return group;
  }
}
