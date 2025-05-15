import { BeneficioComponent } from './components/beneficio/beneficio.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ControlFlowComponent } from './components/control-flow/control-flow.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TesteComponent } from './components/teste/teste.component';
import { ProdutoDetalheComponent } from './components/produto-detalhe/produto-detalhe.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { TarefasComponent } from './components/tarefas/tarefas.component';

export const routes: Routes = [
  {path : '', component: HomeComponent},
  {path: 'cliente', component:ClienteComponent},
  {path: 'control-flow', component:ControlFlowComponent},
  {path: 'app-teste', component:TesteComponent},
  {path: 'produto/:id', component:ProdutoDetalheComponent},
  {path: 'categoria', component:CategoriaComponent},
  {path: 'tarefa', component:TarefasComponent},
  {path: 'beneficio', component:BeneficioComponent},
  {path: '**', component:NotfoundComponent}

];

