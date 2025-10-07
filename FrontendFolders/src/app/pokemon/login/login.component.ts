import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {PokemonService} from '../pokemon.service';
import {HttpClient} from '@angular/common/http';
import {Trainer} from '../../model/trainer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FloatLabel,
    InputText,
    Password,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email_value: any;
  password_value: any;


  constructor(private httpClient: HttpClient,
              private pokemonService: PokemonService) {}

  accessPage() {
    this.httpClient.get(this.pokemonService.apiURL + '/api/trainers/search/' + this.email_value)
      .subscribe({
        next: (response: any) => {
          let trainer_response_object = response as Trainer
          const cond1 = this.email_value == trainer_response_object.email;
          const cond2 = this.password_value == trainer_response_object.password;
          console.log(cond1)
          console.log(cond2)
          cond1 && cond2 ?
            this.pokemonService.changePage('pokemon/hub', trainer_response_object) :
            setTimeout(() => {alert("Wrong password/email.")}, 500);
        },
        error: error => setTimeout(() => {alert("Account not found.")}, 500)
      })
  }

  registerPage() {

  }
}
