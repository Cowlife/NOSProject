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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FloatLabel,
    FormsModule,
    InputNumber,
    Password,
    Button,
    InputText
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name_value: any;
  email_value: any;
  password_value: any;
  confirm_password_value: any;
  trainer_to_be_inserted: Trainer = {} as Trainer;

  constructor(private httpClient: HttpClient,
              private pokemonService: PokemonService) {
  }

  registerToPage() {
    this.trainer_to_be_inserted.name = this.name_value
    this.trainer_to_be_inserted.email = this.email_value
    if (this.password_value == this.confirm_password_value && this.password_value != ''){
      this.trainer_to_be_inserted.password = this.password_value
      this.httpClient.post(this.pokemonService.apiURL + '/api/trainers', this.trainer_to_be_inserted)
        .subscribe({
          next: (response: any) => {
            setTimeout(() => {alert("Account succesfully created.")}, 500);
            this.pokemonService.changePage('pokemon/hub', this.trainer_to_be_inserted)
          },
          error: error => setTimeout(() => {alert("Account not inserted.")}, 500)
        })
    }
    else{
      setTimeout(() => {alert("Please fill all fields including the passwords.")}, 500)
    }

  }
}
