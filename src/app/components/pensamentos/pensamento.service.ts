import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { IPensamento } from './IPensamento';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  API = 'http://localhost:3000/pensamentos'
  constructor(private readonly http: HttpClient) { }
  listar(page: number,filtro: string,favorito : boolean): Observable<IPensamento[]> {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', 2)

      if(filtro.trim().length > 2) {
        params = params.set('q', filtro)
      }
      if(favorito) 
        params = params.set('favorito', 'true')
    return this.http.get<IPensamento[]>(this.API,{params})
  }

  criar(pensamento: IPensamento): Observable<IPensamento> {
    return this.http.post<IPensamento>(this.API, pensamento)
  }

  editar(pensamento: IPensamento): Observable<IPensamento> {
    const url = `${this.API}/${pensamento.id}`
    return this.http.put<IPensamento>(url, pensamento )

  }

  excluir(id: number): Observable<IPensamento> {
    const url = `${this.API}/${id}`
    return this.http.delete<IPensamento>(url)
  }

  buscarPorId(id: number): Observable<IPensamento> {
    const url = `${this.API}/${id}`
    return this.http.get<IPensamento>(url)
  }
}
