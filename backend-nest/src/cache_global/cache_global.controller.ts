import { Controller} from '@nestjs/common';
import { CacheGlobalService } from './cache_global.service';


@Controller('cache-global')
export class CacheGlobalController {
  constructor(private readonly cacheGlobalService: CacheGlobalService) {}
}
