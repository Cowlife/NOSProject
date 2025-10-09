import {NamedAPIResource} from './namedAPIResource';

export interface BaseStat{
  baseStatId? : number;
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}
