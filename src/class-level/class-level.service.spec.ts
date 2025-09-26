import { Test, TestingModule } from '@nestjs/testing';
import { ClassLevelService } from './class-level.service';

describe('ClassLevelService', () => {
  let service: ClassLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassLevelService],
    }).compile();

    service = module.get<ClassLevelService>(ClassLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
