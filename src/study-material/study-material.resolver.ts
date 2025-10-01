import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudyMaterialService } from './study-material.service';
import { StudyMaterial } from './entities/study-material.entity';
import { CreateStudyMaterialInput } from './dto/create-study-material.input';
import { UpdateStudyMaterialInput } from './dto/update-study-material.input';
import { StudyMaterialPaginationResultOutput } from './dto/find-all-study-material.output';
import { FindAllStudyMaterialInput } from './dto/find-all-study-material.input';
import { DoneResponseOutput } from 'src/shared/types/done-output';

@Resolver(() => StudyMaterial)
export class StudyMaterialResolver {
  constructor(private readonly studyMaterialService: StudyMaterialService) {}

  @Mutation(() => StudyMaterial)
  public createStudyMaterial(@Args('createStudyMaterialInput') createInput: CreateStudyMaterialInput) {
    return this.studyMaterialService.create(createInput);
  }

  @Query(() => StudyMaterialPaginationResultOutput, { name: 'study-materials' })
  public findAll(@Args('filter') filter: FindAllStudyMaterialInput) {
    return this.studyMaterialService.findAll(filter);
  }

  @Query(() => StudyMaterial, { name: 'study-material' })
  public findOne(@Args('id') id: string) {
    return this.studyMaterialService.findOne({ id });
  }

  @Mutation(() => StudyMaterial)
  public updateStudyMaterial(@Args('updateStudyMaterialInput') updateInput: UpdateStudyMaterialInput) {
    return this.studyMaterialService.update(updateInput);
  }

  @Mutation(() => DoneResponseOutput)
  public removeStudyMaterial(@Args('id') id: string) {
    this.studyMaterialService.remove(id);
    return { done: true };
  }
}
