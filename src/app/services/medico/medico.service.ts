import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { path } from "src/environments/environment";
import { UsuarioService } from "../usuario/usuario.service";
import { Medico } from "src/app/models/medico.model";

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
    let url = `${path}/medicos`;
    url += `?desde=${desde}`;
    url += `&token=${this._usuarioService.token}`;

    return this.http.get(url);
  }

  // ==================================================
  // Crear un nuevo Medico
  // ==================================================
  crearMedico(medico: Medico) {
    if (!medico._id) {
      let url = `${path}/medicos`;
      url += `?token=${this._usuarioService.token}`;

      return this.http.post(url, medico);
    } else {
      let url = `${path}/medicos/${medico._id}`;
      url += `?token=${this._usuarioService.token}`;

      return this.http.put(url, medico);
    }
  }

  // ==================================================
  // Buscar medicos
  // ==================================================
  buscarMedicos(termino: string) {
    let url = `${path}/search/search/medicos/${termino}`;
    url += `?token=${this._usuarioService.token}`;

    return this.http.get(url);
  }

  // ==================================================
  // Buscar medicos
  // ==================================================
  buscarMedico(id: string) {
    let url = `${path}/medicos/${id}`;
    url += `?token=${this._usuarioService.token}`;

    return this.http.get(url);
  }
}
