import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Carros } from './components/interfaces/Carros';
import { HomeComponent } from "./home/home.component";
import { NavComponent } from './components/nav/nav.component';
import { TesteComponent } from './components/teste/teste.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, NavComponent,HomeComponent, TesteComponent, ReactiveFormsModule
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
