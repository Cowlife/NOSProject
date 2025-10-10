import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Trainer} from '../../model/trainer';
import {PokemonService} from '../pokemon.service';
import {catchError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SecurityService} from '../security.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FloatLabel,
    FormsModule,
    InputNumber,
    Password,
    Button,
    InputText,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name_value: any = '';
  email_value: any = '';
  password_value: any = '';
  confirm_password_value: any = '';
  trainer_to_be_inserted: Trainer = {} as Trainer;

  constructor(private httpClient: HttpClient,
              private pokemonService: PokemonService,
              private securityService: SecurityService,
              protected messageService: MessageService,) {
  }

  registerToPage() {
    this.trainer_to_be_inserted.firstName = this.name_value
    this.trainer_to_be_inserted.email = this.email_value
    this.trainer_to_be_inserted.rank = 'Rookie'
    if (this.password_value == this.confirm_password_value && this.password_value != ''){
      this.trainer_to_be_inserted.password = this.password_value
      console.log(this.trainer_to_be_inserted)
      console.log(this.pokemonService.apiURL + '/api/trainers')
      this.httpClient.post(this.pokemonService.apiURL + '/api/trainers', this.trainer_to_be_inserted)
        .subscribe({
          next: (response: any) => {
            this.messageService.add({ severity: 'success', summary: 'SUCCESS', detail: "Account succesfully created.", life: 3000 })
            //this.securityService.hashAllPasswordsOfDatabase()
            this.pokemonService.changePage('pokemon/hub', this.trainer_to_be_inserted)
          },
          error: error => this.messageService.add({ severity: "danger", summary: 'ERROR', detail: "Account not inserted.", life: 3000 })
        })
    }
    else{
      this.messageService.add({ severity: 'info', summary: 'Info', detail: "Please fill all fields including the passwords.", life: 3000 })
    }

  }

  back() {
    this.pokemonService.changePage('')
  }
}
