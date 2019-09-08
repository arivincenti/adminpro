import { Injectable } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { URL_SERVICIOS } from "src/app/config/config";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/internal/operators/map";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router:Router) {
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

  getStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
      localStorage.removeItem('usuario')
    }
  }

  isLogged(){
    return (this.token.length > 5) ? true : false; 
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token: token }).pipe(map((res:any) => {
      this.saveStorage(res.id, res.token, res.data);
      return true;
    }));
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

  logOut(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuarios";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return resp.data;
      })
    );
  }
}
