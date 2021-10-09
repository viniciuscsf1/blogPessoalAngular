import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if(environment.token == ""){
      this.router.navigate(['/entrar'])  //comando para mandar o usuário de volta à pagina de login
    }

    this.findAllTemas()
  }

  findAllTemas(){               //subscribe: passar o Json para o objeto Typescript
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=> {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }
}
