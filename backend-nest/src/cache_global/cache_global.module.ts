import { Module } from '@nestjs/common';
import { CacheGlobalService } from './cache_global.service';
import { CacheGlobalController } from './cache_global.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokedex } from 'src/pokemon/entities/pokedex.entity';

@Module({
  imports: [HttpModule,
            CacheModule.register({
                isGlobal: true,
                store: redisStore,
                host: 'localhost', // Redis server host
                port: 6379, // Redis server port
                ttl: 50000, // Cache expiration time
                max: 1000, // Maximum number of items in cache
              })],
  controllers: [CacheGlobalController],
  providers: [CacheGlobalService],
  exports: [CacheGlobalService],
})
export class CacheGlobalModule {}
