import {NamedAPIResource} from './namedAPIResource';
import {MetaData} from './metaData';
import {EffectEntry} from './effectEntry';

export interface MoveLong{
  id: number;
  accuracy: number;
  damage_class: NamedAPIResource;
  effect_entries: EffectEntry[];
  meta: MetaData;
  power: number;
  pp: number;

  target: NamedAPIResource;
}
