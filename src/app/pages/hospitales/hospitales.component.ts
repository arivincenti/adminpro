import { Component, OnInit } from "@angular/core";
import { Hospital } from "src/app/models/hospital.model";
import {
  HospitalesService,
  ModalUploadFilesService
} from "src/app/services/service.index";
import Swal from "sweetalert2";

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styleUrls: ["./hospitales.component.css"]
})
export class HospitalesComponent implements OnInit {
  hospital: Hospital = {
    nombre: null,
    usuario: null
  };
  hospitales: Hospital[] = [];
  desde: number = 0;
  registros: number = 0;
  loading: boolean = true;
  handle_modal: string = "hide_modal";

  constructor(
    private hospitalesService: HospitalesService,
    private modalService: ModalUploadFilesService
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this.modalService.notificacion.subscribe(res => this.cargarHospitales());
  }

  // ==================================================
  // Cargar todos los hospitales
  // ==================================================
  cargarHospitales() {
    this.loading = true;
    this.hospitalesService
      .cargarHospitales(this.desde)
      .subscribe((res: any) => {
        this.loading = false;
        this.hospitales = res.data;
        this.registros = res.total;
      });
  }

  // ==================================================
  // Buscar un hospital por el buscador
  // ==================================================
  buscarHospital(termino: string) {
    this.loading = true;
    if (termino) {
      this.hospitalesService.buscarHospitales(termino).subscribe((res: any) => {
        this.hospitales = res.data;
        this.loading = false;
      });
    } else {
      this.cargarHospitales();
    }
  }

  // ==================================================
  // Actualizar Hospital
  // ==================================================
  actualizarHospital(hospital: Hospital) {
    this.hospitalesService
      .actualizarHospital(hospital)
      .subscribe((res: any) => {
        Swal.fire({
          type: "success",
          title: "Excelente!",
          text: "El hospital se modificó con éxito"
        });
      });
  }

  crearHospital() {
    this.hospital.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.hospitalesService
      .crearHospital(this.hospital)
      .subscribe((res: Hospital) => {
        Swal.fire({
          type: "success",
          title: "Excelente!",
          text: "El hospital se creó con éxito"
        });

        this.cargarHospitales();
      });
    this.cerrarModalNuevoHospital();
  }

  // ==================================================
  // Actualizar Imagen
  // ==================================================
  mostrarModal(hospital: Hospital) {
    this.modalService.mostrarModal(hospital._id, "hospitales");
  }

  // ==================================================
  // Mostrar modal de carga de nuevo hospital
  // ==================================================
  mostrarModalNuevoHospital() {
    this.handle_modal = "show_modal";
  }

  // ==================================================
  // Cerrar modal de carga de nuevo hospital
  // ==================================================
  cerrarModalNuevoHospital() {
    this.hospital.nombre = null;
    this.hospital.usuario = null;
    this.handle_modal = "hide_modal";
  }

  // ==================================================
  // Cambiar valor desde para listar Hospitales
  // ==================================================
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.registros) {
      console.log("Te pasaste");
      return;
    }

    if (desde < 0) {
      console.log("Te quedaste corto");
      return;
    }

    this.desde += valor;

    this.cargarHospitales();
  }
}
