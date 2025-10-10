import {PokemonType} from './pokemonType';
import {Sprites} from './sprites';
import {BaseStat} from './baseStat';
import {MoveShort} from './moveShort';

export interface Pokemon{
  id: number,
  name: string,
  order: number,
  sprites: Sprites,
  types: PokemonType[],
  favorite: boolean,
  stats: BaseStat[],
  moves: MoveShort[];
}
