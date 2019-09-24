import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import {
  ModalUploadFilesService,
  UploadFilesService
} from "src/app/services/service.index";

@Component({
  selector: "app-modal-upload-file",
  templateUrl: "./modal-upload-file.component.html",
  styles: []
})
export class ModalUploadFileComponent implements OnInit {
  imgUpload: File;
  imgTemp: string;
  hide_modal: string = this.modalService.handle_modal;
  constructor(
    private uploadFiles: UploadFilesService,
    public modalService: ModalUploadFilesService
  ) {}

  ngOnInit() {}

  selectImg(file: File) {
    if (!file) {
      this.imgUpload = null;
      return;
    }

    if (file.type.indexOf("image") < 0) {
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
    };
  }

  saveImg() {
    this.uploadFiles
      .uploadFile(this.imgUpload, this.modalService.tipo, this.modalService.id)
      .subscribe(res => {
        console.log(res);
        this.modalService.notificacion.emit(res);
        this.cerrarModal();
        Swal.fire({
          type: "success",
          title: "Excelente",
          text: "La imagen de guardó con éxito"
        });
      });
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imgUpload = null;

    this.modalService.ocultarModal();
  }
}
