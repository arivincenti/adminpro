import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, Form } from "@angular/forms";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";

declare function init_plugins(): any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") }
    );

    //Seteo el form
    this.form.setValue({
      nombre: "Ariel",
      email: "arivincenti@gmail.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
  }

  //Validators personalizados
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      } else {
        return {
          sonIguales: true
        };
      }
    };
  }

  //Metodos
  nuevoUsuario() {
    if (!this.form.valid) {
      Swal.fire({
        type: "warning",
        title: "Atención",
        text: "Debe completar todos los campos"
      });
      return;
    }

    if (!this.form.value.condiciones) {
      Swal.fire({
        type: "warning",
        title: "Atención",
        text: "Debe aceptar los terminos y condiciones"
      });
      return;
    }

    let usuario = new Usuario(
      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(resp => {
      Swal.fire({
        type: "success",
        title: "Genial!",
        text: "El usuario " + resp.email + " se creó correctamente"
      });
      this.router.navigate(['login']);
    });
  }
}
