import { Test, TestingModule } from '@nestjs/testing';
import { CacheGlobalService } from './cache_global.service';

describe('CacheGlobalService', () => {
  let service: CacheGlobalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheGlobalService],
    }).compile();

    service = module.get<CacheGlobalService>(CacheGlobalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
