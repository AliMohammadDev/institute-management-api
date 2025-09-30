import { Test, TestingModule } from '@nestjs/testing';
import { DdService } from './dd.service';

describe('DdService', () => {
  let service: DdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DdService],
    }).compile();

    service = module.get<DdService>(DdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
