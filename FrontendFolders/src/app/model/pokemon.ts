import {PokemonType} from './pokemonType';
import {Sprites} from './sprites';

export interface Pokemon{
  id: number,
  name: string,
  order: number,
  sprites: Sprites,
  types: PokemonType[],
  favorite: boolean,

}
