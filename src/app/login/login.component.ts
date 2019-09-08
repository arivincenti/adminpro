import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../models/usuario.model";
import { URL_SERVICIOS } from "../config/config";

declare function init_plugins(): any;
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  form: FormGroup;

  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem("email") || "";

    if (this.email.length > 0) {
      this.recuerdame = true;
    }

    this.form = new FormGroup({
      email: new FormControl(this.email, Validators.required),
      password: new FormControl(null, Validators.required),
      recuerdame: new FormControl(this.recuerdame)
    });
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        cient_id:
          "527697525454-lk14372hp2dm8goq1fhd37rhnsl62rjn.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });

      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(res => {
        // this.router.navigate(["dashboard"]);
        window.location.href= '/dashboard';
      });
    });
  }

  login() {
    if (!this.form.valid) {
      Swal.fire({
        type: "warning",
        title: "Atencion",
        text: "Debe completar todos los campos"
      });
      return;
    }

    if (this.form.value.recuerdame) {
      localStorage.setItem("email", this.form.value.email);
    } else {
      localStorage.removeItem("email");
    }

    let usuario = new Usuario(
      null,
      this.form.value.email,
      this.form.value.password
    );

    this.usuarioService
      .login(usuario, this.form.value.recuerdame)
      .subscribe(res => {
        this.router.navigate(["dashboard"]);
      });
  }
}
