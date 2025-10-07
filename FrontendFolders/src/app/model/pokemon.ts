import {PokemonType} from './pokemonType';
import {Sprites} from './sprites';

export interface Pokemon{
  id: number,
  order: number,
  sprites: Sprites,
  types: PokemonType[],
  favorite: boolean,

}
