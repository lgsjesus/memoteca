import { Component, Input, OnInit } from '@angular/core';
import { IPensamento } from '../IPensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  constructor(private readonly pensamentoService: PensamentoService) { }

  @Input() pensamento  : IPensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false
  }
  @Input() listaPensamentos : IPensamento[] = []

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }
  favoritarPensamento(){
    this.pensamento.favorito = !this.pensamento.favorito;
    this.pensamentoService.editar(this.pensamento).subscribe(()=>{
      if(!this.pensamento.favorito) {       
        const index = this.listaPensamentos.indexOf(this.pensamento)
        this.listaPensamentos.splice(index,1)
      }
    })  
   }
}
