import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "src/app/config/config";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class UploadFilesService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File, type: string, id: string) {

    let formData = new FormData();
    formData.append("imagen", file, file.name);
    let url = `${URL_SERVICIOS}/images/upload/${type}/${id}`;

    return this.http.put(url, formData);

    // return new Promise((resolve, reject) => {
    //   let formData = new FormData();

    //   let xhr = new XMLHttpRequest();

    //   formData.append("imagen", file, file.name);

    //   xhr.onreadystatechange = () => {
    //     if (xhr.readyState === 4) {
    //       if (xhr.status === 200) {
    //         console.log("Imagen subida");
    //         resolve(xhr.response);
    //       } else {
    //         console.log("Fallo la subida");
    //         resolve(xhr.response);
    //       }
    //     }
    //   };

    //   let url = `${URL_SERVICIOS}/images/upload/${type}/${id}`;

    //   xhr.open("PUT", url, true);
    //   xhr.send(formData);
    // });
  }
}
