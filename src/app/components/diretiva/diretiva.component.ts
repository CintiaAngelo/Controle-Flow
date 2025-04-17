import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diretiva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diretiva.component.html',
  styleUrl: './diretiva.component.css'
})
export class DiretivaComponent {
  isActive = true;
  hasError = true;
  classes = ["text-success", "text-danger", "special"]
  isSpecial = false;

  size = '50px';
  font= 'Arial'
  color ='yellow'

  currentItem: any ={
    name : ''
  }
  steUpperCaseName(value:string){
    this.currentItem.name = value.toUpperCase()
  }
}
