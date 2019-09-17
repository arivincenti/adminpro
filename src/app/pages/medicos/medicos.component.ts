import { Component, OnInit } from "@angular/core";
import { Medico } from "src/app/models/medico.model";
import { MedicoService } from "src/app/services/medico/medico.service";
import { Hospital } from "src/app/models/hospital.model";
import { HospitalesService } from "src/app/services/service.index";

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styleUrls: ["./medicos.component.css"]
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  registros: number = 0;
  desde: number = 0;
  loading: boolean = true;

  constructor(private _medicoService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.loading = true;
    this._medicoService.cargarMedicos(this.desde).subscribe((res: any) => {
      this.medicos = res.data;
      this.registros = res.total;
      this.loading = false;
    });
  }

  buscarMedicos(termino: string) {
    if (termino) {
      this.loading = true;
      this._medicoService.buscarMedicos(termino).subscribe((res: any) => {
        this.medicos = res.data;
        this.loading = false;
      });
    } else {
      this.cargarMedicos();
    }
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

    this.cargarMedicos();
  }
}
