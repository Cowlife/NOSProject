
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MoveLong } from 'src/pokemon/entities/move_long.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';


@Injectable()
export class CacheGlobalService {

  uri: string = "https://pokeapi.co/api/v2/";

  logger = new Logger(CacheGlobalService.name);

  constructor(private readonly httpService: HttpService, 
              @Inject(CACHE_MANAGER) private readonly cacheManager: Cache){}

  async findMoveInfo(move: string): Promise<MoveLong>{
    const cacheString: string = `moves:${move.toLowerCase().trim()}`;
    const value = await this.cacheManager.get<MoveLong>(cacheString);
    if (value) {
      this.logger.log(`cache HIT: ${move}`);
      return value;
    }
    this.logger.log(`cache MISS: ${move}`);
    const request = await firstValueFrom(
        this.httpService.get<MoveLong>(this.uri + "move/" + move).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data)
            throw new Error('An error happened')
          })
        )
      ); 
    
    await this.cacheManager.set(cacheString, request.data, 0);  

    return request.data;
  }

  async clearMoveCache(move: string){
    const cacheString: string = `moves:${move.toLowerCase().trim()}`;
    const deleted = await this.cacheManager.del(cacheString);
    this.logger.log(deleted ? `Cache cleared: ${cacheString}` : `No cache entry for ${cacheString}`);  
  }
    

}
