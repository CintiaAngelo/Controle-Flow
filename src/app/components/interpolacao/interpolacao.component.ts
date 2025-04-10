import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interpolacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interpolacao.component.html',
  styleUrl: './interpolacao.component.css'
})
export class InterpolacaoComponent {
  name: string = 'Cintia';
  age: number = 20;
  job = 'Developer';
  hobbies = ['Music', 'Books', 'Movies'];
  car = { make: 'Chevrolet', model: 'Astra' };
  //para exibir uma imagem busque uma imagem na web e salve dentro da pasta assets
  imageUrl = '../../../assets/png-transparent-snoopy-snoopy-for-president-charlie-brown-wood-peanuts-snoopy-miscellaneous-monochrome-snoopy-thumbnail.png';

}
