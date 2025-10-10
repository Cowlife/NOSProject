import { Component } from '@angular/core';
import {TableModule} from 'primeng/table';
import {FilterMatchMode, FilterService, MessageService, SelectItem} from 'primeng/api';
import {NgForOf, NgIf} from '@angular/common';
import {Trainer} from '../../../model/trainer';
import {PokemonService} from '../../pokemon.service';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {Card} from 'primeng/card';

export interface Car {
  id? : number;
  vin? : string;
  year? : number;
  brand? : string;
  color? : string;
  price? : number;
  saleDate? : string;
}

@Component({
  selector: 'app-battle-center',
  standalone: true,
  imports: [
    TableModule,
    NgForOf,
    NgIf,
    Button,
    Dialog,
    Card
  ],
  providers: [MessageService],
  templateUrl: './battle-center.component.html',
  styleUrl: './battle-center.component.css'
})
export class BattleCenterComponent {

  trainers: Trainer[] = [];

  cols: any[] = [];

  matchModeOptions: SelectItem[] = [];

  constructor(private filterService: FilterService,
              private pokemonService: PokemonService,
              protected messageService: MessageService) {}

  ngOnInit() {

    this.cols = [
      { field: 'nameId', header: 'Id' },
      { field: 'firstName', header: 'Name' },
      { field: 'rank', header: 'Rank' },
      { field: '', header: 'Battle' },
    ];

    this.matchModeOptions = [
      { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
      { label: 'Contains', value: FilterMatchMode.CONTAINS},
      { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS},
      { label: 'Ends With',value: FilterMatchMode.ENDS_WITH},
      { label: 'Equals',value: FilterMatchMode.EQUALS},
      { label: 'Not Equals',value: FilterMatchMode.NOT_EQUALS}
    ];

    this.pokemonService.getAllTrainersExceptOne().subscribe((data: any) => {
      this.trainers = data

    })

  }

  protected readonly FilterMatchMode = FilterMatchMode;
  dialog_visibility: boolean = false;

  showDialog(data: any) {
    console.log(data)
    this.dialog_visibility = true;
  }
}
