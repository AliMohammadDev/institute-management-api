import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassLevelService } from './class-level.service';
import { ClassLevel } from './entities/class-level.entity';
import { CreateClassLevelInput } from './dto/create-class-level.input';
import { UpdateClassLevelInput } from './dto/update-class-level.input';
import { ClassLevelPaginationResultOutput } from './dto/find-all-class-level.output';
import { findAllClassLevelInput } from './dto/find-all-class-level.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';

@Resolver(() => ClassLevel)
export class ClassLevelResolver {
  constructor(private readonly classLevelService: ClassLevelService) {}

  @Mutation(() => ClassLevel)
  public createClassLevel(@Args('createClassLevelInput') createClassLevelInput: CreateClassLevelInput) {
    return this.classLevelService.create(createClassLevelInput);
  }

  @Query(() => ClassLevelPaginationResultOutput, { name: 'classLevels' })
  public findAll(@Args('filter') filter: findAllClassLevelInput) {
    return this.classLevelService.findAll(filter);
  }

  @Query(() => ClassLevel, { name: 'classLevel' })
  public findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classLevelService.findOne({ id });
  }

  @Mutation(() => ClassLevel)
  public updateClassLevel(@Args('updateClassLevelInput') updateClassLevelInput: UpdateClassLevelInput) {
    return this.classLevelService.update(updateClassLevelInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeClassLevel(@Args('id', { type: () => Int }) id: number) {
    this.classLevelService.remove(id);
    return { done: true };
  }
}
