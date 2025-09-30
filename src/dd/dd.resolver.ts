import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DdService } from './dd.service';
import { Dd } from './entities/dd.entity';
import { CreateDdInput } from './dto/create-dd.input';
import { UpdateDdInput } from './dto/update-dd.input';

@Resolver(() => Dd)
export class DdResolver {
  constructor(private readonly ddService: DdService) {}

  @Mutation(() => Dd)
  createDd(@Args('createDdInput') createDdInput: CreateDdInput) {
    return this.ddService.create(createDdInput);
  }

  @Query(() => [Dd], { name: 'dd' })
  findAll() {
    return this.ddService.findAll();
  }

  @Query(() => Dd, { name: 'dd' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ddService.findOne(id);
  }

  @Mutation(() => Dd)
  updateDd(@Args('updateDdInput') updateDdInput: UpdateDdInput) {
    return this.ddService.update(updateDdInput.id, updateDdInput);
  }

  @Mutation(() => Dd)
  removeDd(@Args('id', { type: () => Int }) id: number) {
    return this.ddService.remove(id);
  }
}
