import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../interfaces/Categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  categorias: Categoria[] = [];
  categoriaIdEdicao: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private formBuilder: FormBuilder
  ) {
    this.categoriaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: [''],
      ativa: [true]
    });
  }

  ngOnInit(): void {
    this.list();
  }

  // Listar todas as categorias
  list(): void {
    this.categoriaService.list().subscribe((resposta) => (this.categorias = resposta));
  }

  // Salvar uma categoria (add ou update)
  save(): void {
    if (this.categoriaForm.valid) {
      const formData = this.categoriaForm.value;

      if (this.categoriaIdEdicao !== null) {
        const categoriaUpdate: Categoria = {
          id: this.categoriaIdEdicao,
          nome: formData.nome,
          descricao: formData.descricao,
          ativa: formData.ativa
        };

        this.categoriaService.update(this.categoriaIdEdicao, categoriaUpdate).subscribe(() => {
          this.list(); // Recarregar lista de categorias
          this.categoriaIdEdicao = null;
          this.categoriaForm.reset(); // Limpar formulário após salvar
          alert('Categoria atualizada com sucesso!');
        });
      } else {
        const categoriaAdd = {
          nome: formData.nome,
          descricao: formData.descricao,
          ativa: formData.ativa
        } as Categoria; // Correção: Cast para Categoria

        this.categoriaService.add(categoriaAdd).subscribe(() => {
          this.list(); // Recarregar lista de categorias
          this.categoriaForm.reset(); // Limpar formulário após salvar
          alert('Categoria adicionada com sucesso!');
        });
      }
    } else {
      alert('Favor preencher todos os campos obrigatórios!');
    }
  }

  // Editar uma categoria
  editar(id: number): void {
    const categoria = this.categorias.find(c => c.id === id);

    if (categoria) {
      this.categoriaIdEdicao = categoria.id;
      this.categoriaForm.patchValue({
        nome: categoria.nome,
        descricao: categoria.descricao,
        ativa: categoria.ativa
      });
    }
  }

  // Remover uma categoria
  remover(id: number): void {
    if (confirm('Tem certeza que deseja remover esta categoria?')) {
      this.categoriaService.remove(id).subscribe(() => {
        this.list(); // Recarregar lista de categorias
        alert('Categoria removida com sucesso!');
      });
    }
  }
}