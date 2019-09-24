import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService, private router:Router){}

  canActivate(): boolean {
    if(this.usuarioService.isLogged()){
      console.log('Pasó por el guard');
      return true;
    }else{
      console.log('Bloqueado por el guard');
      this.usuarioService.logOut();
      return false;
    }
  }
}
