import {NamedAPIResource} from './namedAPIResource';

export interface Pokedex{
  id: number;
  count:number;
  previous: string;
  next: string;
  results: NamedAPIResource[];
}
