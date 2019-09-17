import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'node_modules/ng2-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { BoosterComponent } from '../components/booster/booster.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { ModalUploadFileComponent } from '../components/modal-upload-file/modal-upload-file.component';
import { MedicoComponent } from './medicos/medico/medico.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    BoosterComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    ModalUploadFileComponent,
    MedicoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graphics1Component,
    ProfileComponent
  ]
})
export class PagesModule { }