import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button, ButtonDirective} from 'primeng/button';
import {PokemonService} from '../pokemon.service';
import {Drawer} from 'primeng/drawer';
import {NgForOf, NgIf} from '@angular/common';
import {Card} from 'primeng/card';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Favorite} from '../../model/favorite';
import {Dialog} from 'primeng/dialog';

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
    Dialog
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

  constructor(protected pokemonService: PokemonService,
              protected messageService: MessageService,
              protected confirmationService: ConfirmationService){}


  splitStringByComma(element: string | undefined, number: number): string | undefined{
    console.log(element)
    var new_string = element?.split(',') ?? ""
    return new_string[number]
  }

  deleteElement(result: Favorite) {
    this.pokemonService.deleteFavoriteElement(result, this.messageService)
  }

  showDialog(current_pokemon: Favorite) {
    this.dialog_visibility = true;
    this.current_pokemon = current_pokemon
  }
}
