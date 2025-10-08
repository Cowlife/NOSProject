import {SelectItem} from 'primeng/api';

export interface PokeSelectItem<T = any> extends SelectItem{

  /**
   * @interface PokeSelectItem
   * @description A simple interface that references the primeng SelectItem
   * interface to allow for custom keys and labels to be inserted along the
   * program. The ones already implemented inside are:
   * @default value - Describes initial pokemon type
   * @default icon -
   * @default title - Describes pokemon name
   * @default label - Describes pokemon image
   *
   * The other variables created are:
   * @var secValue - Describes secondary pokemon type
   **/

  secValue?: T;

}
