import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { HttpModule} from '@nestjs/axios';
import { CacheGlobalModule } from 'src/cache_global/cache_global.module';

// Cache based on https://medium.com/@citi_zen/implementing-caching-in-nestjs-quick-guide-2cfe50dd241d
// NOTE: NEVER import TypeOrm.forRoot when needing external API calls


@Module({
  imports: [HttpModule,
            CacheGlobalModule],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [PokemonService]
})
export class PokemonModule {}
