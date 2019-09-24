import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "src/app/models/usuario.model";
import { Hospital } from "src/app/models/hospital.model";
import { Medico } from "src/app/models/medico.model";
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: "app-busqueda",
  templateUrl: "./busqueda.component.html",
  styleUrls: ["./busqueda.component.css"]
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.params.subscribe(params => {
      let termino = params["termino"];
      this.buscar(termino);
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    let url = `${URL_SERVICIOS}/search/search/${termino}`;
    this.http.get(url).subscribe((res: any) => {
      this.usuarios = res.data.usuarios;
      this.hospitales = res.data.hospitales;
      this.medicos = res.data.medicos;
    });
  }
}
