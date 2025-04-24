import { Injectable } from '@angular/core';
import { Cliente } from '../components/interfaces/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientes: Cliente[] =[
    {id: "1", nome: "Cintia", telefone: "11983849745"},
    {id: "2", nome: "Victor", telefone: "11930059788"},
    {id: "3", nome: "Clara" }
  ]

  constructor() { }

  //retornar a lista de clientes
  list(): Cliente[]{
    return this.clientes;
  }

  remove(id:string){
    //busva o cliente na lista
    const cliente = this.clientes.find(c => c.id == id)

    if(cliente){//caso encontre o cliente
      //busca o index
      const index = this.clientes.indexOf(cliente)
      //remove da lista
      this.clientes.splice(index,1)
    }
  }

  add(cliente:Cliente) {
    //o push add o item(obj) dentro de um array
    this.clientes.push(cliente)
    console.log(this.clientes)
  }

  update(id:String, cliente:Cliente){
    const index = this.clientes.findIndex(c=> c.id ==id)

    if(index !== -1){
      this.clientes[index] =
      {
        ...this.clientes[index],
        ...cliente
      }
    }
  }

}
