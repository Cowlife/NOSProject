import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-hub',
  standalone: true,
  imports: [
    RouterOutlet,
    Button
  ],
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.css'
})
export class HubComponent {

}
