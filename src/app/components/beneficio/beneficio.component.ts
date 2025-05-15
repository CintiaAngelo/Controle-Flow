import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficioService } from '../../services/beneficio.service';
import { Beneficio } from '../interfaces/Beneficio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './beneficio.component.html',
  styleUrl: './beneficio.component.css'
})
export class BeneficioComponent implements OnInit {
  beneficios: Beneficio[] = [];
  beneficioForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private beneficioService: BeneficioService, private formBuilder: FormBuilder) {
    this.beneficioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      imagem: [''],
    });
  }

  ngOnInit(): void {
    this.listarBeneficios();
  }

  listarBeneficios(): void {
    this.beneficioService.list().subscribe(beneficios => this.beneficios = beneficios);
  }

  adicionarBeneficio(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.beneficioForm.valid) {
      const novoBeneficio = this.beneficioForm.value as Beneficio;
      this.beneficioService.add(novoBeneficio).subscribe({
        next: (beneficioAdicionado) => {
          this.beneficios.push(beneficioAdicionado); 
          this.beneficioForm.reset();
          this.mensagemSucesso = 'Beneficio adicionada com sucesso!';
          setTimeout(() => this.mensagemSucesso = '', 3000);
        },
        error: (erro) => {
          this.mensagemErro = 'Erro ao adicionar beneficio.';
          console.error('Erro ao adicionar beneficio:', erro);
          setTimeout(() => this.mensagemErro = '', 3000);
        }
      });
    } else {
      this.mensagemErro = 'Por favor, preencha o título do beneficio';
      setTimeout(() => this.mensagemErro = '', 3000);
    }
  }

  // removerBeneficio(id: string): void {
  //   this.beneficioService.remove(id).subscribe({
  //     next: () => {
  //       this.beneficios = this.beneficios.filter(beneficio => beneficio.id !== id);
  //       this.mensagemSucesso = `Tarefa com ID ${id} removida com sucesso!`;
  //       setTimeout(() => this.mensagemSucesso = '', 3000);
  //     },
  //     error: (erro) => {
  //       this.mensagemErro = 'Erro ao remover tarefa.';
  //       console.error('Erro ao remover tarefa:', erro);
  //       setTimeout(() => this.mensagemErro = '', 3000);
  //     }
  //   });
  // }
}
