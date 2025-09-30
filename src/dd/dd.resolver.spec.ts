import { Test, TestingModule } from '@nestjs/testing';
import { DdResolver } from './dd.resolver';
import { DdService } from './dd.service';

describe('DdResolver', () => {
  let resolver: DdResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DdResolver, DdService],
    }).compile();

    resolver = module.get<DdResolver>(DdResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
