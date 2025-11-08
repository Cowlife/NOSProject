import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonType } from 'src/pokemon/entities/pokemon_type.entity';

@Injectable()
export class FavoriteService {
  

  constructor(
      @InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
      private readonly pokemonService: PokemonService,
    ) {}

  async createFavorite(createFavoriteDto: CreateFavoriteDto) {
    const pokemon_element: Pokemon = await this.pokemonService.findPokemonElementsByName(createFavoriteDto.favoritePokemonName);
    const baseStats: number[] = [];
    for (const stat of pokemon_element.stats){
      baseStats.push(stat.base_stat);
    }
    createFavoriteDto.pokemonStats = baseStats;
    const img_ref: string = pokemon_element.sprites.front_default;
    createFavoriteDto.pokemonImage = img_ref;
    const types_ref: PokemonType[] = pokemon_element.types;
    let res_string = "";
    for (const type of types_ref){
      res_string = res_string + type.type.name + ","
    } 
    createFavoriteDto.pokemonTypes = res_string.trim().slice(0,-1)
    const favorite: Favorite = this.favoriteRepository.create(createFavoriteDto);
    return this.favoriteRepository.save(favorite);
  }

  findAllFavoritesByEmail(email: string): Promise<Favorite[]> {
    if (email == null || email.length == 0){
      return this.favoriteRepository.find();
    }
    return this.favoriteRepository.find({where: {trainerEmail: email}});
  }

  findFavoriteWithEmailAndName(email: string, name: string) {
    return this.favoriteRepository.findOneBy({trainerEmail: email, favoritePokemonName: name});
  }



  update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  remove(email: string, name: string){
    return this.favoriteRepository.delete({ trainerEmail: email, favoritePokemonName: name});
  }

}
