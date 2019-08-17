import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"]
})
export class ProgressComponent implements OnInit {
  progress1: number = 50;
  progress2: number = 50;
  progress3: number = 50;

  constructor() {}

  ngOnInit() {}
}
