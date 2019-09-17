import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  usuario: Usuario
  imgUpload: File;
  imgTemp: string;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  guardarCambios(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this.usuarioService
      .actualizarUsuario(this.usuario)
      .subscribe((res: Usuario) => {
        this.usuario = res;

        Swal.fire({
          type: "success",
          title: "Excelente",
          text: "El perfil se actualizó con éxito"
        });

        console.log(res);
      });
  }

  selectImg(file: File) {
    if (!file) {
      this.imgUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire({
        type: "error",
        title: "Hubo un problema",
        text: "Unicamente se permite subir imagenes"
      });
      this.imgUpload = null;
      return;
    }

    this.imgUpload = file;
    
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result.toString();
    }
  }

  changeImg() {
    this.usuarioService
      .changeImg(this.imgUpload, this.usuario._id)
      .subscribe(res => {
        console.log(res);
        Swal.fire({
          type: "success",
          title: "Excelente",
          text: "La imagen de guardó con éxito"
        });
      });
  }
}
