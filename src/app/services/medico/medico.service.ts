import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "src/app/models/medico.model";
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) {}

  // ==================================================
  // Carga todos los medicos
  // ==================================================
  cargarMedicos(desde: number) {
    let url = `${URL_SERVICIOS}/medicos`;
    url += `?desde=${desde}`;
    url += `&token=${this._usuarioService.token}`;

    return this.http.get(url);
  }

  // ==================================================
  // Crear un nuevo Medico
  // ==================================================
  crearMedico(medico: Medico) {
    if (!medico._id) {
      let url = `${URL_SERVICIOS}/medicos`;
      url += `?token=${this._usuarioService.token}`;

      return this.http.post(url, medico);
    } else {
      let url = `${URL_SERVICIOS}/medicos/${medico._id}`;
      url += `?token=${this._usuarioService.token}`;

      return this.http.put(url, medico);
    }
  }

  // ==================================================
  // Buscar medicos
  // ==================================================
  buscarMedicos(termino: string) {
    let url = `${URL_SERVICIOS}/search/search/medicos/${termino}`;
    url += `?token=${this._usuarioService.token}`;

    return this.http.get(url);
  }

  // ==================================================
  // Buscar medicos
  // ==================================================
  buscarMedico(id: string) {
    let url = `${URL_SERVICIOS}/medicos/${id}`;
    url += `?token=${this._usuarioService.token}`;

    return this.http.get(url);
  }
}
