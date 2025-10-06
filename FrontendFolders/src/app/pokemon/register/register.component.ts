import { Component } from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {Password} from 'primeng/password';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';

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
  phone_value: any;
  password_value: any;
  confirm_password_value: any;

  registerToPage() {

  }
}
