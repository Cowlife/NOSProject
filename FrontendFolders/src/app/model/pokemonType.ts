import {NamedAPIResource} from './namedAPIResource';

export interface PokemonType{
  slot: number;
  type: NamedAPIResource;
  pokemon: NamedAPIResource;
}
