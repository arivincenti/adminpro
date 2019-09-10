import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { URL_SERVICIOS } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { Router } from "@angular/router";
import { UploadFilesService } from "../uploadFiles/upload-files.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadFile: UploadFilesService
  ) {
    console.log("Servicio de usuario listo");
    this.getStorage();
  }

  saveStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  getStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
      localStorage.removeItem("usuario");
    }
  }

  isLogged() {
    return this.token.length > 5 ? true : false;
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.saveStorage(res.id, res.token, res.data);
        return true;
      })
    );
  }

  login(usuario: Usuario, recuerdame: boolean) {
    let url = URL_SERVICIOS + "/login";

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.saveStorage(res.id, res.token, res.data);

        return true;
      })
    );
  }

  logOut() {
    this.usuario = null;
    this.token = "";

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    this.router.navigate(["/login"]);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuarios";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuarios/${usuario._id}?token=${this.token}`;

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        this.saveStorage(res.usuario._id, this.token, res.usuario);
        return res.usuario;
      })
    );
  }

  changeImg(file: File, id: string) {
    return this.uploadFile.uploadFile(file, "usuarios", id).pipe(map((res:any) => {
      this.usuario.img = res.data.img;
      this.saveStorage(id, this.token, this.usuario);
      return res.data;
    }));
  }
}
