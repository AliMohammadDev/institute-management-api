import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { GroupPaginationResultOutput } from './dto/find-all-group.output';
import { FindAllGroupInput } from './dto/find-all-group.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';

@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group)
  public createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }

  @Query(() => GroupPaginationResultOutput, { name: 'groups' })
  public findAll(@Args('filter') filter: FindAllGroupInput) {
    return this.groupService.findAll(filter);
  }
  @Query(() => Group, { name: 'group' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.groupService.findOne({ id });
  }

  @Mutation(() => Group)
  public updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeGroup(@Args('id', { type: () => Int }) id: number) {
    this.groupService.remove(id);
    return { done: true };
  }
}
