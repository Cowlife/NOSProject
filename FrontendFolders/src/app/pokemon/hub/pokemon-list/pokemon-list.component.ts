import {Component, Inject} from '@angular/core';
import {Pokedex} from '../../../model/pokedex';
import {PokemonService} from '../../pokemon.service';
import {Card} from 'primeng/card';
import {Button, ButtonDirective} from 'primeng/button';
import {
  ConfirmationService,
  FilterMatchMode,
  FilterService,
  MenuItem,
  MessageService,
  PrimeTemplate,
  SelectItem
} from 'primeng/api';
import {AsyncPipe, CommonModule, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Pokemon} from '../../../model/pokemon';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {Image} from 'primeng/image';
import {Sprites} from '../../../model/sprites';
import {forkJoin, map, Observable, of, switchMap, take, tap} from 'rxjs';
import {PokemonType} from '../../../model/pokemonType';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {NamedAPIResource} from '../../../model/namedAPIResource';
import {PokeSelectItem} from '../../../model/PokeSelectItem';
import {Table, TableModule} from 'primeng/table';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {SplitButton} from 'primeng/splitbutton';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Dialog} from 'primeng/dialog';
import {Drawer} from 'primeng/drawer';
import {Favorite} from '../../../model/favorite';
import {ArtService} from '../../art.service';
import {PokemonDialogComponent} from '../pokemon-dialog/pokemon-dialog.component';
import {HubComponent} from '../hub.component';
import {MoveLong} from '../../../model/moveLong';




@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    Card,
    Button,
    PrimeTemplate,
    NgForOf,
    NgOptimizedImage,
    PaginatorModule,
    Image,
    AsyncPipe,
    NgIf,
    Checkbox,
    FormsModule,
    CommonModule,
    FloatLabel,
    InputText,
    SplitButton,
    TableModule,
    Toast,
    ConfirmDialog,
    Dialog,
    Drawer,
    ButtonDirective,
    PokemonDialogComponent
  ],
  providers: [MessageService, HubComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  pokemon_list: any = {} as Pokedex;
  record_length: number = 0;

  protected readonly console = console;
  dialog_visible: boolean = false;

  filteredArray: any[] = []
  defaultRecords: number = 10;
  defaultPage: number = 0;
  data_ref: PaginatorState = {} as PaginatorState;
  checked_types_array: any[] = [];
  filtered_types_array: any[] = [];
  intersection_array: any[] = [];
  ordered_array: any[] = [];

  pokemon_item_select: PokeSelectItem[] = []
  current_extracted_data: Pokemon = {} as Pokemon;
  dialog_visibility: boolean = false;

  type_categories: any = [] as NamedAPIResource[];
  selected_type_categories: any[] = [];
  matchModeOptions: SelectItem[] = [];
  search_value: string = '';
  items: MenuItem[] = [];

  is_being_filtered: boolean = false
  orderIconIndex: number = 0;
  orderArray = ['pi pi-sort-alt-slash', 'pi pi-sort-alpha-down', 'pi pi-sort-alpha-up-alt']
  private order_function: Record<number, any> = {};


  constructor(protected pokemonService: PokemonService,
              private filterService: FilterService,
              protected messageService: MessageService,
              protected artService: ArtService,
              protected hubComponent: HubComponent) {
    this.items = [
      {
        label: "Equals",
        command: () => {
          this.filterName(FilterMatchMode.EQUALS);
        }
      },
      {
        label: "Not Equals",
        command: () => {
          this.filterName(FilterMatchMode.NOT_EQUALS);
        }
      },
      {
        label: "Contains",
        command: () => {
          this.filterName(FilterMatchMode.CONTAINS);
        }
      },
      {
        label: "Not Contains",
        command: () => {
          this.filterName(FilterMatchMode.NOT_CONTAINS);
        }
      },
    ];

  }

  ngOnInit(){
    this.pokemonService.getAllPokemon().subscribe((data: any)=>{
      this.pokemon_list = data;
      this.record_length = this.pokemon_list.results.length;
      this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: 'Account entered successfully', life: 3000 });
      this.matchModeOptions = [
        { label: 'Starts With', value: FilterMatchMode.STARTS_WITH },
        { label: 'Contains', value: FilterMatchMode.CONTAINS},
        { label: 'Not Contains', value: FilterMatchMode.NOT_CONTAINS},
        { label: 'Ends With',value: FilterMatchMode.ENDS_WITH},
        { label: 'Equals',value: FilterMatchMode.EQUALS},
        { label: 'Not Equals',value: FilterMatchMode.NOT_EQUALS}
      ];

      this.pokemonService.getAllMoves().subscribe((result: any) => {
        this.pokemonService.pokemon_moves_repo = result;
      })

      this.pokemonService.getFavoritesByEmail().subscribe((value: any) => {
        this.pokemonService.favorite_pokemon = value
      })


      this.filteredArray = this.pokemon_list.results.slice(0, this.defaultRecords);

      this.modifyIndividualPlantArray();


    });
    this.pokemonService.getAllTypes().subscribe(type_data =>{
      this.type_categories = type_data as NamedAPIResource[];
    })
  }


  modifyIndividualPlantArray(){
    this.pokemon_item_select = [];

    const requests = this.filteredArray.map(element =>
      this.pokemonService.getPokemonElement(element.name)
    );


    // fork Join used to wait for request and maintain order
    forkJoin(requests).subscribe((types: any) => {
      types.forEach(
        (element: any)=> {
          let bool_ref = false;
          this.pokemonService.checkIfEmailAndPokemonExistInFavorite(
            this.pokemonService.current_user.email, element.name).subscribe((data: any)=>{
            bool_ref = data;
            const primary = element.types[0]
            const secondary = element.types[1] ?? ""
            this.pokemon_item_select.push({
              title: element.name,
              value: primary.type.name,
              secValue: secondary != "" ? secondary.type.name : "",
              label: element.sprites.front_default,
              favorite: bool_ref,
            })

          });
        }
      )

    });


  }



  onPageChange(data: PaginatorState, reset: boolean = false) {
    if (Object.keys(data).length !== 0){
      this.data_ref = data;
    }

    this.defaultRecords = this.data_ref.rows ?? 10;
    this.defaultPage = this.data_ref.page ?? 0;

    this.filteredArray = [];

    const array_to_slice = this.intersection_array.length <= 0 ?
      this.pokemon_list.results : this.intersection_array;
    this.filteredArray = array_to_slice.slice(
      this.defaultPage * this.defaultRecords,
      (this.defaultPage + 1) * this.defaultRecords );

    this.modifyIndividualPlantArray()

    // console.log("Data Page:" + data.page) » Actual page index
    // console.log("Page Index:" + data.first) » Index the page begins with
    // console.log("Data Rows:" + data.rows) » Rows that table can display
    // console.log("Page Count Max:" + data.pageCount) » Total pages
  }

  matchTypeSearch(checked: string[]) {
    if (checked.length == 0){
      this.checked_types_array = [];
      if (this.filtered_types_array.length > 0){
        this.intersection_array = this.filtered_types_array
        this.record_length = this.intersection_array.length
      }
      else{
        this.intersection_array = [];
        this.record_length = this.pokemon_list.results.length
      }

      this.onPageChange({})
    }
    else{
      this.checked_types_array = checked;

      // @_REMINDER: Never use curly brackets to extract requests
      const filter_requests = checked.map((element: any) =>
        this.pokemonService.getAllPokemonByType(element.name)
      );

      forkJoin(filter_requests).subscribe((object_array: any) => {
        this.checked_types_array = [];
        object_array.forEach(
          (ind_object: any)=> {
            ind_object.pokemon.forEach(
              (ind_element: any)=> {
                this.checked_types_array.push(ind_element.pokemon)
              }
            )
          })
        this.record_length = this.checked_types_array.length

        const union = this.checked_types_array.concat(this.filtered_types_array);
        this.intersection_array = this.filtered_types_array.length == 0 ?
        this.checked_types_array : this.getArrayDuplicates(union,'name');

        if(this.checked_types_array.length <= 0){
          this.showErrorDialog()
        }


        this.onPageChange({})

      });
    }



  }

  protected filterName(case_string: string = '') {
    if (case_string == ''){
      this.filtered_types_array = []
      this.is_being_filtered = false
      if (this.checked_types_array.length > 0){
        this.intersection_array = this.checked_types_array;
        this.record_length = this.intersection_array.length
      }
      else{
        this.intersection_array = [];
        this.record_length = this.pokemon_list.results.length
      }
      this.search_value = ''
      this.onPageChange({})
    }
    else{
      var array_to_filter: any[] = this.pokemon_list.results;

      const filteredArray =
        array_to_filter.filter((word) =>{
          if ([FilterMatchMode.CONTAINS,FilterMatchMode.NOT_CONTAINS].includes(case_string)){
            return this.filterService.filters[case_string](word.name, this.search_value)
          }
          else{
            return this.filterService.filters[case_string](this.search_value, word.name)
          }
        }
      )

      this.filtered_types_array = filteredArray

      const union = this.checked_types_array.concat(this.filtered_types_array);
      this.intersection_array = this.checked_types_array.length == 0 ?
        this.filtered_types_array : this.getArrayDuplicates(union,'name');

      this.is_being_filtered = true
      this.record_length = filteredArray.length

      if(this.filtered_types_array.length <= 0){
        this.showErrorDialog();
      }

      this.onPageChange({})
    }

  }





  orderValues() {
    this.ordered_array = []
    this.ordered_array = (this.intersection_array.length == 0 ?
      this.pokemon_list.results : this.intersection_array);
    this.orderIconIndex == 2 ?
      this.orderIconIndex = 0 : ++this.orderIconIndex;
    this.onPageChange({})

    this.order_function  = {
      0: this.pokemon_list.results,
      1: this.pokemon_list.results.sort((a:any, b:any) => a.name.localeCompare(b.name)),
      2: this.pokemon_list.results.sort((a:any, b:any) => b.name.localeCompare(a.name)),
    }

    this.pokemon_list.results.sort((a:any, b:any) => a.name.localeCompare(b.name));


    return this.orderArray[this.orderIconIndex];
  }


  getArrayDuplicates(arr: any, key: any) {
    const map: any = {};
    const duplicates: any[] = [];

    arr.forEach((item: any) => {
      const keyValue = item[key];
      if (map[keyValue]) {
        duplicates.push(item);
      } else {
        map[keyValue] = true;
      }
    });

    return duplicates;
  }

  showErrorDialog() {
    this.record_length = this.pokemon_list.results.length
    this.orderIconIndex = 0
    this.is_being_filtered = false
    this.search_value = ''
    this.dialog_visible = true;
    this.selected_type_categories = [];
    this.intersection_array = [];
  }

  changeFavorite(pokemon: PokeSelectItem){
    const favorite_element = {} as Favorite;
    favorite_element.favoritePokemonName = pokemon.title ?? ""
    favorite_element.trainerEmail = this.pokemonService.current_user.email;
    pokemon.favorite ?
      this.pokemonService.deleteFavoriteElement(favorite_element, this.messageService)
    : this.pokemonService.createFavoriteElement(favorite_element, this.messageService)
    pokemon.favorite = !pokemon.favorite;
  }

  showDialog(result: PokeSelectItem) {
    this.dialog_visibility = true;
    this.pokemonService.getPokemonElement(result.title ?? '').subscribe((data: any) => {
      this.current_extracted_data = data;
    })
  }

  hideDialog(event: any){
    this.dialog_visibility = event;
    console.log("Extracted data: ")
    console.dir(this.current_extracted_data)
  }

}
