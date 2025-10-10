import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button, ButtonDirective} from 'primeng/button';
import {PokemonService} from '../pokemon.service';
import {Drawer} from 'primeng/drawer';
import {NgForOf, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem} from 'primeng/api';
import {Favorite} from '../../model/favorite';
import {Dialog} from 'primeng/dialog';
import {ArtService} from '../art.service';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [
    RouterOutlet,
    Button,
    ButtonDirective,
    Drawer,
    NgForOf,
    Card,
    NgIf,
    Dialog,
    TableModule,
    IconField,
    InputIcon,
    InputText,
    Toast
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {
  drawer_visibility: boolean = false;
  dialog_visibility: boolean = false;
  primaryType: string | undefined;
  secondaryType: string | undefined;
  current_pokemon: Favorite = {} as Favorite;
  matchModeOptions: SelectItem[] = [];
  retrieval_cols!: any[];
  current_extracted_data: any = {}
  protected readonly console = console;

  constructor(protected pokemonService: PokemonService,
              protected messageService: MessageService,
              protected confirmationService: ConfirmationService,
              protected artService: ArtService){}

  ngOnInit(){
    this.retrieval_cols = [
      { field: 'name', header: 'Move Name' },
      { field: 'type', header: 'Move Type' },
      { field: 'power', header: 'Power' },
      { field: 'pp', header: 'PP' },
      { field: 'accuracy', header: 'Accuracy' },
    ];
    this.matchModeOptions = [
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS},
      { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS},
      { label: 'Ends With',value: FilterMatchMode.ENDS_WITH},
      { label: 'Equals',value: FilterMatchMode.EQUALS},
      { label: 'Not Equals',value: FilterMatchMode.NOT_EQUALS}
    ];
  }

  splitStringByComma(element: string | undefined, number: number): string | undefined{
    var new_string = element?.split(',') ?? ""
    return new_string[number]
  }

  deleteElement(result: Favorite) {
    this.pokemonService.deleteFavoriteElement(result, this.messageService)
  }

  showDialog(current_pokemon: Favorite) {
    this.dialog_visibility = true;
    this.current_pokemon = current_pokemon

    this.pokemonService.getPokemonElement(current_pokemon.favoritePokemonName).subscribe(data => {
      this.current_extracted_data = data;
      console.log(this.current_extracted_data)
    })

  }



  checkFavorites() {

  }
}
