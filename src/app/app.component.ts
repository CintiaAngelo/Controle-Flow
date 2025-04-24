import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InterpolacaoComponent } from './components/interpolacao/interpolacao.component';
import { ControlFlowComponent } from './components/control-flow/control-flow.component';
import { PropertieBindingComponent } from './components/propertie-binding/propertie-binding.component';
import { DiretivaComponent } from './components/diretiva/diretiva.component';
import { Carros } from './components/interfaces/Carros';
import { ClienteComponent } from './components/cliente/cliente.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ClienteComponent
    // PropertieBindingComponent,
    // DiretivaComponent
    //InterpolacaoComponent,
    //ControlFlowComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-control-flow';

  carros: Carros [] = [
    {id:1, nome:"Corolla", marca: "Toyota", ano:2004, placa:"FOS0266"},
    {id:2, nome:"Impala", marca: "Chevrolet", ano:1967, placa: "BEN4J99"},
    {id:3, nome:"Astra", marca: "Chevrolet", ano:2011, placa: "KQZ2977"},
    ]
}
