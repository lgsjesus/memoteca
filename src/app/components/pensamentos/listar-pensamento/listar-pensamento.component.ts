import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../IPensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  constructor(private readonly service: PensamentoService, private readonly router: Router) { }
  listaPensamentos : IPensamento[] = []
  page : number = 1;
  filtro: string = '';
  haMaisPensamentos: boolean = true;
  favorito: boolean = false;
  titulo: string = 'Meus Pensamentos'

  ngOnInit(): void {
    this.service.listar(this.page,this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos
    })
  } 
  recarregar() : void {
    this.page = 1
    this.favorito = false  
    this.router.navigate([this.router.url])
  }
  carregarMaisPensamentos() : void{
    this.service.listar(++this.page,this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos.push(...pensamentos)
      
      if(pensamentos.length <= 0) {
        this.haMaisPensamentos = false
      }
    })
  }
  pesquisarPensamentos() : void {
    this.haMaisPensamentos = true
    this.page = 1
    this.service.listar( this.page, this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos
    })
  }
  pesquisarFavoritos() : void {    
    this.page = 1
    this.favorito = true
    this.titulo = 'Meus Pensamentos Favoritos'
    this.service.listar( this.page, this.filtro,this.favorito).subscribe(pensamentos => {
      this.listaPensamentos = pensamentos
    })
  }
}
