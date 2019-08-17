import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: []
})
export class DoughnutChartComponent implements OnInit {

  @Input() leyenda:string = '';
  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];
  @Input() doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
