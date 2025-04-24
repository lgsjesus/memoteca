import { Component, OnInit } from '@angular/core';
import { IPensamento } from '../IPensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {


  formulario! : FormGroup;
  
  constructor(
    private readonly service: PensamentoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo,[Validators.required, Validators.minLength(5), Validators.maxLength(300),Validators.pattern(/(.|\s)*\S(.|\s)*/)]],
        autoria: [pensamento.autoria,[Validators.required, Validators.minLength(5), Validators.maxLength(50),Validators.pattern(/(.|\s)*\S(.|\s)*/)]],
        modelo: [pensamento.modelo],
        favorito: [false]
      })
    })
  }

  editarPensamento() {
    if(this.formulario.invalid) {
      return
    }
    this.service.editar(this.formulario?.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })

  }

  cancelar() {
    this.router.navigate(['/listarPensamento'])
  }

}
