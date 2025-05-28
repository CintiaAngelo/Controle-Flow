import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeneficioService } from '../../services/beneficio.service';
import { Beneficio } from '../interfaces/Beneficio';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-beneficio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './beneficio.component.html',
  styleUrl: './beneficio.component.css'
})
export class BeneficioComponent implements OnInit {
  beneficios: Beneficio[] = [];
  beneficiosFiltrados: Beneficio[] = [];
  beneficioForm: FormGroup;
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  beneficioIdEdicao: string | null = null;
  
  // Propriedades para upload de imagem
  imagemPreview: string | ArrayBuffer | null = null;
  arquivoImagem: File | null = null;
  
  // Propriedades para estatísticas
  contagemPorPerfil: {[key: string]: number} = {};
  totalGasto: number = 0;
  
  // Propriedades para filtros
  filtros = {
    nome: '',
    perfil: '',
    valorMin: null as number | null,
    valorMax: null as number | null,
    ativo: '' as '' | 'true' | 'false'
  };

  constructor(private beneficioService: BeneficioService, private formBuilder: FormBuilder) {
    this.beneficioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      perfil: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      ativo: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.listarBeneficios();
  }

  listarBeneficios(): void {
    this.beneficioService.list().subscribe(beneficios => {
      this.beneficios = beneficios;
      this.aplicarFiltros();
      this.calcularContagemPorPerfil();
      this.calcularTotalGasto();
    });
  }
  
  // Método para tratar o upload de arquivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.arquivoImagem = file;
      
      // Criar visualização prévia
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.arquivoImagem = null;
      this.imagemPreview = null;
      alert('Por favor, selecione apenas arquivos de imagem.');
    }
  }
  
  // Método para converter a imagem para base64
  private converterImagemParaBase64(callback: (base64: string) => void): void {
    if (!this.arquivoImagem) {
      callback('');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      callback(base64);
    };
    reader.readAsDataURL(this.arquivoImagem);
  }

  // Método para aplicar filtros
  aplicarFiltros(): void {
    this.beneficiosFiltrados = this.beneficios.filter(beneficio => {
      // Filtro por nome
      if (this.filtros.nome && !beneficio.nome.toLowerCase().includes(this.filtros.nome.toLowerCase())) {
        return false;
      }
      
      // Filtro por perfil
      if (this.filtros.perfil && beneficio.perfil !== this.filtros.perfil) {
        return false;
      }
      
      // Filtro por valor mínimo
      if (this.filtros.valorMin !== null && beneficio.valor < this.filtros.valorMin) {
        return false;
      }
      
      // Filtro por valor máximo
      if (this.filtros.valorMax !== null && beneficio.valor > this.filtros.valorMax) {
        return false;
      }
      
      // Filtro por status (ativo/inativo)
      if (this.filtros.ativo) {
        const ativoBoolean = this.filtros.ativo === 'true';
        if (beneficio.ativo !== ativoBoolean) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  // Método para limpar filtros
  limparFiltros(): void {
    this.filtros = {
      nome: '',
      perfil: '',
      valorMin: null,
      valorMax: null,
      ativo: ''
    };
    this.aplicarFiltros();
  }

  // Método para calcular a contagem de benefícios por perfil
  calcularContagemPorPerfil(): void {
    this.contagemPorPerfil = {
      'gerente': 0,
      'coordenador': 0,
      'analista': 0,
      'sem_perfil': 0
    };
    
    this.beneficios.forEach(beneficio => {
      if (beneficio.perfil) {
        this.contagemPorPerfil[beneficio.perfil]++;
      } else {
        this.contagemPorPerfil['sem_perfil']++;
      }
    });
  }
  
  // Método para calcular o total gasto em benefícios
  calcularTotalGasto(): void {
    this.totalGasto = this.beneficios
      .filter(beneficio => beneficio.ativo) // Considera apenas benefícios ativos
      .reduce((total, beneficio) => {
        return total + (beneficio.valor || 0);
      }, 0);
  }
  
  // Método para alterar o status de um benefício
  alterarStatus(id: string): void {
    const beneficio = this.beneficios.find(b => b.id === id);
    if (beneficio) {
      const beneficioAtualizado: Beneficio = {
        ...beneficio,
        ativo: !beneficio.ativo
      };
      
      this.beneficioService.update(id, beneficioAtualizado).subscribe(() => {
        this.listarBeneficios();
        this.mensagemSucesso = `Status do benefício "${beneficio.nome}" alterado com sucesso!`;
        setTimeout(() => this.mensagemSucesso = '', 3000);
      });
    }
  }

  save(): void {
    if (this.beneficioForm.valid) {
      const formData = this.beneficioForm.value;

      // Usamos o método para converter a imagem para base64
      this.converterImagemParaBase64((imagemBase64) => {
        if (this.beneficioIdEdicao !== null) {
          const beneficioUpdate: Beneficio = {
            id: this.beneficioIdEdicao,
            nome: formData.nome,
            perfil: formData.perfil,
            valor: formData.valor,
            ativo: formData.ativo,
            imagem: imagemBase64 || this.beneficios.find(b => b.id === this.beneficioIdEdicao)?.imagem || '',
          };

          this.beneficioService.update(this.beneficioIdEdicao, beneficioUpdate).subscribe(() => {
            this.listarBeneficios();
            this.beneficioIdEdicao = null;
            this.resetForm();
            alert('Beneficio atualizado com sucesso!');
          });
        } else {
          const beneficioAdd = {
            nome: formData.nome,
            perfil: formData.perfil,
            valor: formData.valor,
            ativo: formData.ativo,
            imagem: imagemBase64 || '',
          } as Beneficio; 

          this.beneficioService.add(beneficioAdd).subscribe(() => {
            this.listarBeneficios();
            this.resetForm();
            alert('Beneficio adicionado com sucesso!');
          });
        }
      });
    } else {
      alert('Favor preencher todos os campos obrigatórios!');
    }
  }
  
  // Método para resetar o formulário e limpar a visualização de imagem
  resetForm(): void {
    this.beneficioForm.reset({
      ativo: true,
      valor: 0
    });
    this.imagemPreview = null;
    this.arquivoImagem = null;
  }

  removerBeneficio(id: string): void {
    if (confirm('Tem certeza que deseja remover este benefício?')) {
      this.beneficioService.remove(id).subscribe({
        next: () => {
          this.beneficios = this.beneficios.filter(beneficio => beneficio.id !== id);
          this.aplicarFiltros();
          this.calcularContagemPorPerfil();
          this.calcularTotalGasto();
          this.mensagemSucesso = `Benefício removido com sucesso!`;
          setTimeout(() => this.mensagemSucesso = '', 3000);
        },
        error: (erro) => {
          this.mensagemErro = 'Erro ao remover benefício.';
          console.error('Erro ao remover benefício:', erro);
          setTimeout(() => this.mensagemErro = '', 3000);
        }
      });
    }
  }

  editarBeneficio(id: string): void {
    const beneficio = this.beneficios.find(b => b.id === id);

    if (beneficio) {
      this.beneficioIdEdicao = beneficio.id;
      this.beneficioForm.patchValue({
        nome: beneficio.nome,
        perfil: beneficio.perfil,
        valor: beneficio.valor,
        ativo: beneficio.ativo
      });
      
      // Se houver uma imagem, exibir a pré-visualização
      if (beneficio.imagem && beneficio.imagem.startsWith('data:image')) {
        this.imagemPreview = beneficio.imagem;
      } else {
        this.imagemPreview = null;
      }
    }
  }
}
