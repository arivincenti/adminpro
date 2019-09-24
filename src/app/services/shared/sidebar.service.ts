import { Injectable } from "@angular/core";
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any[] = [];
  // menu: any = [
  //   {
  //     title: "Principal",
  //     icon: "mdi mdi-gauge",
  //     submenu: [
  //       { subtitle: "Dashboard", url: "/dashboard" },
  //       { subtitle: "Graphics", url: "/graphics1" },
  //       { subtitle: "Progress", url: "/progress" },
  //       { subtitle: "Promises", url: "/promises" },
  //       { subtitle: "Rxjs", url: "/rxjs" }
  //     ]
  //   },
  //   {
  //     title: "Mantenimientos",
  //     icon: "mdi mdi-folder-lock-open",
  //     submenu: [
  //       { subtitle: "Usuarios", url: "/usuarios"},
  //       { subtitle: "Medicos", url: "/medicos"},
  //       { subtitle: "Hospitales", url: "/hospitales"},
  //     ]
  //   }
  // ];

  constructor(private _usuarioService: UsuarioService) {
  }
  
  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }
}
