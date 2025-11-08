import { CacheGlobalService } from './../cache_global/cache_global.service';
import { Controller, Get, Param} from '@nestjs/common';
import { PokemonService } from './pokemon.service';


@Controller('/api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService,
              private readonly cacheGlobalService: CacheGlobalService,    
  ) {}

  @Get()
  findAllPokemon() {
    return this.pokemonService.findAllPokemon();
  }

  @Get('name/:name')
  findPokemonElementsByName(@Param('name') name: string) {
    return this.pokemonService.findPokemonElementsByName(name);
  }

  @Get("moves")
  findAllMoves(){
    return this.pokemonService.findAllMoves();
  }

  @Get('types')
  findAllTypes() {
    return this.pokemonService.findAllTypes();
  }

  @Get("/move/:name")
  findPokemonMoveInfo(@Param('name') name: string){
    return this.cacheGlobalService.findMoveInfo(name);
  } 

  @Get("/type/:type")
  findAllPokemonByType(@Param('type') type: string){
    return this.pokemonService.findAllPokemonByType(type);
  }


}
