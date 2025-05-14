import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../components/interfaces/Tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'http://localhost:3000/tarefas'; // URL da API de Tarefas

  // Não precisamos mais da lista local 'tarefas' com a API
  // tarefas: Tarefa[] = [];

  constructor(private http: HttpClient) {}

  list(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  add(tarefa: Omit<Tarefa, 'id'>): Observable<Tarefa> {
    const httpHeaders = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.post<Tarefa>(this.apiUrl, tarefa, httpHeaders);
  }

  update(id: number, tarefa: Tarefa): Observable<Tarefa> {
    const httpHeaders = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa, httpHeaders);
  }
}