import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-booster",
  templateUrl: "./booster.component.html",
  styles: []
})
export class BoosterComponent implements OnInit {
  @ViewChild("txtProgress") txtProgress: ElementRef;
  @Input() leyenda: string = "Leyenda";
  @Input() progress: number = 50;

  @Output() newValue: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(value: number) {

    if (value <= 0) {
      this.progress = 0;
    } else if (value >= 100) {
      this.progress = 100;
    } else {
      this.progress = value;
    }

    this.txtProgress.nativeElement.value = this.progress;
    this.newValue.emit(this.progress);
  }

  changeValue(value: number) {
    if (this.progress >= 100 && value > 0) {
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }

    this.progress += value;

    this.newValue.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }
}
