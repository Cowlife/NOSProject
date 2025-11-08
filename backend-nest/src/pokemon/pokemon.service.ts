import { CacheGlobalService } from './../cache_global/cache_global.service';
import type { Cache } from 'cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Pokedex } from './entities/pokedex.entity';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { MoveLong } from './entities/move_long.entity';
import { Pokemon } from './entities/pokemon.entity';
import { AllPokemonTypeRef } from './entities/all_pokemon_type_ref.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PokemonService {

  uri: string = "https://pokeapi.co/api/v2/";

  logger = new Logger(PokemonService.name);

  constructor(private readonly httpService: HttpService,
              private cacheGlobalService: CacheGlobalService,
              @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}


  async findAllPokemon(): Promise<Pokedex> {
    const request = await firstValueFrom(
      this.httpService.get<Pokedex>(this.uri + "pokemon?limit=100000&offset=0").pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data)
          throw new Error('An error happened')
        })
      )
    ); 
    // https://docs.nestjs.com/techniques/http-module#http-module where it's {data} because it already accesses the 
    // variable in question 
    this.logger.log(request.data)
    const element = plainToInstance(Pokedex, request.data);
    return element;
  }

  
  async findPokemonElementsByName(name: string): Promise<Pokemon> {
    const request = await firstValueFrom(
      this.httpService.get<Pokemon>(this.uri + "pokemon/" + name).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data)
          throw new Error('An error happened')
        })
      )
    ); 
    const element = plainToInstance(Pokemon, request.data);
    return element;
  }

  async findAllTypes(): Promise<Pokedex>{
    const request = await firstValueFrom(
      this.httpService.get<Pokedex>(this.uri + "type").pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data)
          throw new Error('An error happened')
        })
      )
    ); 
    const element = plainToInstance(Pokedex, request.data);
    return element;
  }

  async findAllPokemonByType(type: string): Promise<AllPokemonTypeRef>{
    const request = await firstValueFrom(
      this.httpService.get<AllPokemonTypeRef>(this.uri + "type/" + type).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data)
          throw new Error('An error happened')
        })
      )
    ); 
    const element = plainToInstance(AllPokemonTypeRef, request.data);
    return element;
  }



  async findAllMoves(): Promise<MoveLong[]>{
    const request = await firstValueFrom(
      this.httpService.get<Pokedex>(this.uri + "move?limit=100000&offset=0").pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data)
          throw new Error('An error happened')
        })
      )
    ); 
    const short_move_data = request.data;
    const move_names: string[] = [];
    for (const move of short_move_data.results){
      move_names.push(move.name)
    }
    
    // Based on https://www.youtube.com/watch?v=nY9Q-lb5F6M 
    // still need to see how to use cache in each api call here 
    const resultList: MoveLong[] = await Promise.all(
      move_names.map((name) => this.cacheGlobalService.findMoveInfo(name))
    )

    return resultList;
    
  }

}
