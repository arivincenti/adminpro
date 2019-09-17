import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { path } from "src/environments/environment";
import { Hospital } from "src/app/models/hospital.model";
import { map } from "rxjs/operators";
import { UploadFilesService } from "../uploadFiles/upload-files.service";
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: "root"
})
export class HospitalesService {
  token: string;
  constructor(
    private http: HttpClient,
    private usuarioService:UsuarioService
  ) {}

  // ==================================================
  // Carga todos los hospitales
  // ==================================================
  cargarHospitales(desde:number) {
    return this.http.get(`${path}/hospitales?desde=${desde}&token=${this.usuarioService.token}`);
  }

  // ==================================================
  // Busca un hospital por lo que viene del buscador
  // ==================================================
  buscarHospitales(termino: string) {
    let url = `${path}/search/search/hospitales/${termino}`;
    return this.http.get(url);
  }

    // ==================================================
  // Busca un hospital por lo que viene del buscador
  // ==================================================
  buscarHospital(id: string) {
    let url = `${path}/hospitales/${id}`;
    url += `?token=${this.usuarioService.token}`;
    return this.http.get(url);
  }

  // ==================================================
  // Crear un nuevo hospital
  // ==================================================
  crearHospital(hospital: Hospital) {
    let url = `${path}/hospitales?token=${this.usuarioService.token}`;
    return this.http.post(url, hospital).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  // ==================================================
  // Actualiza el hospital
  // ==================================================
  actualizarHospital(hospital: Hospital) {
    let url = `${path}/hospitales/${hospital._id}?token=${this.usuarioService.token}`;
    return this.http.put(url, hospital);
  }
}
