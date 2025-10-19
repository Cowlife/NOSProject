import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button, ButtonDirective} from 'primeng/button';
import {PokemonService} from '../services/pokemon.service';
import {Drawer} from 'primeng/drawer';
import {NgForOf, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {ConfirmationService, FilterMatchMode, MessageService, SelectItem} from 'primeng/api';
import {Favorite} from '../../model/favorite';
import {Dialog} from 'primeng/dialog';
import {ArtService} from '../services/art.service';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {Toast} from 'primeng/toast';
import {BattleCenterComponent} from './battle-center/battle-center.component';
import {PokemonDialogComponent} from './pokemon-dialog/pokemon-dialog.component';
import {Pokemon} from '../../model/pokemon';
import {BaseStat} from '../../model/baseStat';
import {basename} from '@angular/compiler-cli';

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
    Toast,
    BattleCenterComponent,
    PokemonDialogComponent
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {
  drawer_visibility: boolean = false;
  dialog_visibility: boolean = false;

  current_pokemon: Favorite = {} as Favorite;
  current_extracted_data: Pokemon = {} as Pokemon;
  current_chart_data_options: any[] = [];
  protected readonly console = console;

  constructor(protected pokemonService: PokemonService,
              protected messageService: MessageService,
              protected confirmationService: ConfirmationService,
              protected artService: ArtService){}

  ngOnInit(){
    if(Object.keys(this.pokemonService.current_user).length === 0){
      this.pokemonService.changePage('')
    }
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
    this.pokemonService.getPokemonElement(current_pokemon.favoritePokemonName).subscribe((data: any) => {
      this.current_extracted_data = data;
      let chart_values: number[] = [];
      let chart_labels: string[] = [];
      this.current_extracted_data.stats.forEach((baseStat: BaseStat) => {
          chart_values.push(baseStat.base_stat)
          chart_labels.push(baseStat.stat.name)
        }
      )
      this.current_chart_data_options = this.artService.createChart(
        chart_labels,chart_values,"Pokemon Stats"
      )

    })

  }

  hideDialog(event: any){
    this.dialog_visibility = event;
    console.log("works")
  }

}
