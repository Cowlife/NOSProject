import {Injectable} from '@angular/core';
import {IconDefinition} from '@fortawesome/angular-fontawesome';
import {
  faArrowsDownToPeople,
  faHandFist,
  faHandHoldingHand,
  faMeteor, faPeopleRoof,
  faPersonRays, faQuestion, faUserGear, faUserGroup,
  faUserPen,
  faUserShield, faUsersLine
} from '@fortawesome/free-solid-svg-icons';
import {FilterMatchMode, SelectItem} from 'primeng/api';

@Injectable({
  providedIn: 'root', // This makes the service available application-wide
})

export class PokemonTypesRepo {
  get matchModeOptions(): SelectItem[] {
    return this._matchModeOptions;
  }

  get faAttackTypeMap(): Record<string, IconDefinition> {
    return this._faAttackTypeMap;
  }


  private _faAttackTypeMap: Record<string, IconDefinition> = {
    'special': faMeteor,  // example icon
    'physical': faHandFist,
    'status': faUserPen,
    // Split towards the target below
    'ally': faHandHoldingHand,
    'specific-move': faUserGear,
    'random-opponent': faQuestion,
    'users-field': faUserGroup,
    'all-other-pokemon': faUsersLine,
    'all-opponents': faArrowsDownToPeople,
    'selected-pokemon': faPersonRays,
    'user': faUserShield,
    'entire-field': faPeopleRoof,

  };

  private _matchModeOptions: SelectItem[] = [
    { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
    { label: 'Contains', value: FilterMatchMode.CONTAINS},
    { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS},
    { label: 'Ends With',value: FilterMatchMode.ENDS_WITH},
    { label: 'Equals',value: FilterMatchMode.EQUALS},
    { label: 'Not Equals',value: FilterMatchMode.NOT_EQUALS}
  ];

}
