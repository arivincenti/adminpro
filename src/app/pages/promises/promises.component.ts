import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promises",
  templateUrl: "./promises.component.html",
  styles: []
})
export class PromisesComponent implements OnInit {
  constructor() {
    this.count()
      .then(mensaje => console.log("Termino", mensaje))
      .catch(error => console.log("Error", error));
  }

  ngOnInit() {}

  count(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let counter = 0;

      let interval = setInterval(() => {
        counter = counter + 1;
        console.log(counter);
        if (counter === 3) {
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
