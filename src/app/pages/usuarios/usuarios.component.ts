import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import {
  UsuarioService,
  ModalUploadFilesService
} from "src/app/services/service.index";
import Swal from "sweetalert2";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  registros: number = 0;
  loading: boolean = true;
  constructor(
    private usuarioService: UsuarioService,
    private modalService: ModalUploadFilesService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.modalService.notificacion.subscribe(res => this.cargarUsuarios());
  }

  // ==================================================
  // Cargar todos los usuarios
  // ==================================================
  cargarUsuarios() {
    this.loading = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      this.registros = res.total;
      this.usuarios = res.data;
      this.loading = false;
    });
  }

  // ==================================================
  // Buscar un usuario por el buscador
  // ==================================================
  buscarUsuario(termino: string) {
    this.usuarioService.buscarUsuarios(termino).subscribe((res: any) => {
      if (termino.length) {
        this.usuarios = res.data;
      } else {
        this.cargarUsuarios();
      }
    });
  }

  // ==================================================
  // Actualizar un usuario
  // ==================================================
  actualizarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe(res => {
      Swal.fire({
        type: "success",
        title: "Excelente!",
        text: "El role del usuario se actualizó con éxito"
      });
      console.log(res);
    });
  }

  // ==================================================
  // Mostrar modal para editar imagen
  // ==================================================
  mostrarModal(usuario: Usuario) {
    this.modalService.mostrarModal(usuario._id, "usuarios");
  }

  // ==================================================
  // Cambiar valor desde para la paginación
  // ==================================================
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.registros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;

    this.cargarUsuarios();
  }
}
