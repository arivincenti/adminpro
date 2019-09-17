import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalUploadFilesService {
  handle_modal: string = 'hide_modal';
  tipo:string;
  id: string;
  notificacion = new EventEmitter<any>();

  constructor() {}

  mostrarModal(id: string, tipo: string) {
    this.handle_modal = 'show_modal';
    this.id = id;
    this.tipo = tipo;
    console.log(this.tipo);
  }

  ocultarModal(){
    this.handle_modal = 'hide_modal';
    this.id = null;
    this.tipo = null;
  }
}
