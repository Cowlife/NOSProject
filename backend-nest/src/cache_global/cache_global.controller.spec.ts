import { Test, TestingModule } from '@nestjs/testing';
import { CacheGlobalController } from './cache_global.controller';
import { CacheGlobalService } from './cache_global.service';

describe('CacheGlobalController', () => {
  let controller: CacheGlobalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CacheGlobalController],
      providers: [CacheGlobalService],
    }).compile();

    controller = module.get<CacheGlobalController>(CacheGlobalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
