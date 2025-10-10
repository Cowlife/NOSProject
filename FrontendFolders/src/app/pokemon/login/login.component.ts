import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {PokemonService} from '../pokemon.service';
import {HttpClient} from '@angular/common/http';
import {Trainer} from '../../model/trainer';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FloatLabel,
    InputText,
    Password,
    Button,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email_value: any = '';
  password_value: any = '';


  constructor(private httpClient: HttpClient,
              private pokemonService: PokemonService,
              protected messageService: MessageService,) {}

  accessPage() {
    this.httpClient.get(this.pokemonService.apiURL + '/api/trainers/search/' + this.email_value)
      .subscribe({
        next: (response: any) => {
          let trainer_response_object = response as Trainer
          const cond1 = this.email_value == trainer_response_object.email;
          const cond2 = this.password_value == trainer_response_object.password;
          if (cond1 && cond2){
            this.pokemonService.changePage('pokemon/hub', trainer_response_object)
          }
        },
        error: error => this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Account not found', life: 3000 })
      })

  }


  registerPage() {
    this.pokemonService.changePage('pokemon/register')
  }
}
