import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { catchError } from "rxjs/internal/operators/catchError";
import { Router } from "@angular/router";
import { UploadFilesService } from "../uploadFiles/upload-files.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private uploadFile: UploadFilesService
  ) {
    console.log("Servicio de usuario listo");
    this.getStorage();
  }

  // ==================================================
  // Renovar Token
  // ==================================================
  renuevaToken() {
    let url = `${URL_SERVICIOS}/login/reloadToken`;
    url += `?token=${this.token}`;

    return this.http.get(url).pipe(
      map((res: any) => {
        this.saveStorage(res.id, res.token, res.data, res.menu);
        console.log('Token renovado');
        return true;
      }),
      catchError(error => {
        this.logOut();
        
        Swal.fire({
          type: "error",
          title: "Ups! Hubo un problema",
          text: 'No fue posible renovar el token'
        });

        throw error;
      })
    );
  }

  // ==================================================
  // Guardar data en el storage
  // ==================================================
  saveStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  // ==================================================
  // Obtener informacion del storage
  // ==================================================
  getStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
      localStorage.removeItem("usuario");
      localStorage.removeItem("menu");
    }
  }

  // ==================================================
  // Verificar si esta logueado
  // ==================================================
  isLogged() {
    let token = localStorage.getItem("token");
    return token ? true : false;
  }

  // ==================================================
  // Login de google
  // ==================================================
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";
    console.log("Entro al logingoogle");
    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.saveStorage(res.id, res.token, res.data, res.menu);
        console.log(res);
        return true;
      })
    );
  }

  // ==================================================
  // Login
  // ==================================================
  login(usuario: Usuario, recuerdame: boolean) {
    let url = URL_SERVICIOS + "/login";

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        console.log(res);
        this.saveStorage(res.id, res.token, res.data, res.menu);

        return true;
      }),
      catchError(error => {
        Swal.fire({
          type: "error",
          title: "Ups! Hubo un problema",
          text: error.error.message
        });

        throw error;
      })
    );
  }

  logOut() {
    this.usuario = null;
    this.token = "";
    this.menu = [];

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("menu");

    this.router.navigate(["/login"]);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuarios";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return resp.data;
      }),
      catchError(error => {
        Swal.fire({
          type: "error",
          title: "Ups! Hubo un problema",
          text: error.error.errors.errors.email.message
        });

        throw error;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuarios/${usuario._id}?token=${this.token}`;

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          this.saveStorage(res.usuario._id, this.token, res.usuario, this.menu);
        }
        return res.usuario;
      })
    );
  }

  changeImg(file: File, id: string) {
    return this.uploadFile.uploadFile(file, "usuarios", id).pipe(
      map((res: any) => {
        this.usuario.img = res.data.img;
        this.saveStorage(id, this.token, this.usuario, this.menu);
        return res.data;
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    let url = `${URL_SERVICIOS}/usuarios?token=${this.token}&desde=${desde}`;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = `${URL_SERVICIOS}/search/search/usuarios/${termino}`;

    return this.http.get(url);
  }
}
