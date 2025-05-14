// interfaces/Tarefa.ts
export interface Tarefa {
    id: number;
    titulo: string;
    descricao?: string;
    dataVencimento?: Date;
  }