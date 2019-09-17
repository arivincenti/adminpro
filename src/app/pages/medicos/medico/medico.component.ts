import { Component, OnInit } from "@angular/core";
import { Hospital } from "src/app/models/hospital.model";
import { Medico } from "src/app/models/medico.model";
import {
  HospitalesService,
  UsuarioService,
  ModalUploadFilesService
} from "src/app/services/service.index";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { MedicoService } from "src/app/services/medico/medico.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital(null, null, null, null);
  medico: Medico = new Medico('', '', '', '');

  constructor(
    private _hospitalesService: HospitalesService,
    private _medicoService: MedicoService,
    private _usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private _modalService: ModalUploadFilesService
  ) {
    this.activateRoute.params.subscribe(params => {
      let id = params.id;

      if (id !== "nuevo") {
        this.buscarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalService.notificacion.subscribe((res: any) => {
      this.medico.img = res.data.img;
    });
  }

  // ==================================================
  // Busca los hospitales para cargar en el comboBox
  // ==================================================
  cargarHospitales() {
    this._hospitalesService.cargarHospitales(0).subscribe((res: any) => {
      this.hospitales = res.data;
    });
  }

  // ==================================================
  // Selecciona un hospital
  // ==================================================
  seleccionarHospital(id: string) {
    this._hospitalesService.buscarHospital(id).subscribe((res: any) => {
      this.hospital = res.data;
    });
  }

  // ==================================================
  // Buscar un medico para cargar info
  // ==================================================
  buscarMedico(id: string) {
    this._medicoService.buscarMedico(id).subscribe((res: any) => {
      this.medico = res.data;
      this.medico.hospital = res.data.hospital._id;
      this.medico.usuario = res.data.usuario._id;
      this.seleccionarHospital(this.medico.hospital);
      console.log(this.medico);
    });
  }

  // ==================================================
  // Guardar medico
  // ==================================================
  GuardarMedico(form: NgForm) {
    if (!form.valid) {
      Swal.fire({
        type: "warning",
        title: "Atención",
        text: "Debe completar todos los campos"
      });
      return;
    }

    this.medico.usuario = this._usuarioService.usuario._id;
    this._medicoService.crearMedico(this.medico).subscribe((res: any) => {
      Swal.fire({
        type: "success",
        title: "Excelente",
        text: "El médico se creó con éxito"
      });

      this.medico = res.data;

      console.log(this.medico);
      this.router.navigateByUrl(`/medico/${this.medico._id}`);
    });
  }

  mostrarModal(medico: Medico) {
    console.log(medico);
    this._modalService.mostrarModal(medico._id, "medicos");
  }
}
