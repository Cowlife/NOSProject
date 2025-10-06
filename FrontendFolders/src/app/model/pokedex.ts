import {PokeVariableDesc} from './pokeVariableDesc';

export interface Pokedex{
  id: number;
  count:number;
  previous: String;
  next: String;
  results: PokeVariableDesc[];
}
