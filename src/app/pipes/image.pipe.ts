import { Pipe, PipeTransform } from "@angular/core";
import { path } from "src/environments/environment";

@Pipe({
  name: "image"
})
export class ImagePipe implements PipeTransform
{
  transform(img: string, type: string = "usuarios"): any
  {
    let url = path + "/images";

    if (!img)
    {
      return url + "/usuarios/xxx";
    }

    if (img.indexOf("https") >= 0)
    {
      return img;
    }

    switch (type)
    {
      case "usuarios":
        url += "/usuarios/" + img;
        break;

      case "medicos":
        url += "/medicos/" + img;
        break;

      case "hospitales":
        url += "/hospitales/" + img;
        break;

      default:
        console.log("Tipo de imagen inexistente");
    }

    return url;
  }
}
