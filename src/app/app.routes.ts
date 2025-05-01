import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ControlFlowComponent } from './components/control-flow/control-flow.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {path : '', component: HomeComponent},
  {path: 'cliente', component:ClienteComponent},
  {path: 'control-flow', component:ControlFlowComponent},
  {path: '**', component:NotfoundComponent}
];

