import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../interfaces/Tarefa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css',
})
export class TarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  tarefaForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private tarefaService: TarefaService, private formBuilder: FormBuilder) {
    this.tarefaForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descricao: [''],
      dataVencimento: [''],
    });
  }

  ngOnInit(): void {
    this.listarTarefas();
  }

  listarTarefas(): void {
    this.tarefaService.list().subscribe(tarefas => this.tarefas = tarefas);
  }

  adicionarTarefa(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.tarefaForm.valid) {
      const novaTarefa = this.tarefaForm.value as Tarefa;
      this.tarefaService.add(novaTarefa).subscribe({
        next: (tarefaAdicionada) => {
          this.tarefas.push(tarefaAdicionada); // Adiciona a nova tarefa à lista local
          this.tarefaForm.reset();
          this.mensagemSucesso = 'Tarefa adicionada com sucesso!';
          setTimeout(() => this.mensagemSucesso = '', 3000);
        },
        error: (erro) => {
          this.mensagemErro = 'Erro ao adicionar tarefa.';
          console.error('Erro ao adicionar tarefa:', erro);
          setTimeout(() => this.mensagemErro = '', 3000);
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha o título da tarefa.';
      setTimeout(() => this.mensagemErro = '', 3000);
    }
  }

  removerTarefa(id: number): void {
    this.tarefaService.remove(id).subscribe({
      next: () => {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
        this.mensagemSucesso = `Tarefa com ID ${id} removida com sucesso!`;
        setTimeout(() => this.mensagemSucesso = '', 3000);
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao remover tarefa.';
        console.error('Erro ao remover tarefa:', erro);
        setTimeout(() => this.mensagemErro = '', 3000);
      }
    });
  }
}