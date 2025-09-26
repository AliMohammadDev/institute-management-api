import { Test, TestingModule } from '@nestjs/testing';
import { ClassLevelResolver } from './class-level.resolver';
import { ClassLevelService } from './class-level.service';

describe('ClassLevelResolver', () => {
  let resolver: ClassLevelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassLevelResolver, ClassLevelService],
    }).compile();

    resolver = module.get<ClassLevelResolver>(ClassLevelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
