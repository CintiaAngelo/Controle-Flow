import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beneficio } from '../components/interfaces/Beneficio';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {
  private apiUrl = 'http://localhost:3000/beneficios';

  constructor(private http: HttpClient) {}

  list(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(this.apiUrl);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  add(beneficio: Beneficio) {
    const httpHeaders = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.post<Beneficio>(this.apiUrl, beneficio, httpHeaders);
  }

  update(id: number, beneficio: Beneficio): Observable<Beneficio> {
    const httpHeaders = {
      headers: {
        'Content-type': 'application/json'
      }
    };
    return this.http.put<Beneficio>(`${this.apiUrl}/${id}`, beneficio, httpHeaders);
  }
}
