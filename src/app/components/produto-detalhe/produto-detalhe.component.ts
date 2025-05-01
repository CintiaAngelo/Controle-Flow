import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [],
  templateUrl: './produto-detalhe.component.html',
  styleUrl: './produto-detalhe.component.css'
})
export class ProdutoDetalheComponent {
  id: number =0
  constructor(private route: ActivatedRoute){

    // this.getClienteById();
    this.getProdutoById();
  }

  getProdutoById(): void{
    const idParametro = this.route.snapshot.paramMap.get('id')
    this.id = idParametro ? parseInt(idParametro) : 0
  }
}
