import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../IPensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  constructor(private readonly service: PensamentoService, private readonly router : Router,
    private readonly formBuilder: FormBuilder
  ) { }

  formulario! : FormGroup;

  ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        conteudo: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/(.|\s)*\S(.|\s)*/)]],
        autoria: ['',[Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/(.|\s)*\S(.|\s)*/)]],
        modelo: ['modelo1'],
        favorito: [false]
    })
  }
  criarPensamento() {
    if(this.formulario.invalid) {
      return
    }
    this.service.criar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
