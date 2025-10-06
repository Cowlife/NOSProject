import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {PokemonService} from '../pokemon.service';

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

  constructor(private pokemonService: PokemonService) {}

  accessPage() {
    this.pokemonService.changePage('pokemon/hub');
  }

  registerPage() {

  }
}
