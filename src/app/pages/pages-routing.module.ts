import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graphics1Component } from "./graphics1/graphics1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuard, AdminGuard, VerificaTokenGuard } from "../services/service.index";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { MedicosComponent } from "./medicos/medicos.component";
import { HospitalesComponent } from "./hospitales/hospitales.component";
import { MedicoComponent } from "./medicos/medico/medico.component";
import { BusquedaComponent } from "./busqueda/busqueda.component";

const pagesRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    data: { title: "Dashboard" },
    canActivate: [LoginGuard, VerificaTokenGuard]
  },
  {
    path: "progress",
    component: ProgressComponent,
    data: { title: "Progress" },
    canActivate: [LoginGuard]
  },
  {
    path: "graphics1",
    component: Graphics1Component,
    data: { title: "Graphics" },
    canActivate: [LoginGuard]
  },
  {
    path: "promises",
    component: PromisesComponent,
    data: { title: "Promises" },
    canActivate: [LoginGuard]
  },
  {
    path: "rxjs",
    component: RxjsComponent,
    data: { title: "Rxjs" },
    canActivate: [LoginGuard]
  },
  {
    path: "account-settings",
    component: AccountSettingsComponent,
    data: { title: "Accounts Settings" },
    canActivate: [LoginGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    data: { title: "User Profile" },
    canActivate: [LoginGuard]
  },
  {
    path: "busqueda/:termino",
    component: BusquedaComponent,
    data: { title: "Busqueda" },
    canActivate: [LoginGuard]
  },
  //Mantenimientos
  {
    path: "usuarios",
    component: UsuariosComponent,
    data: { title: "Usuarios" },
    canActivate: [AdminGuard, LoginGuard]
  },
  {
    path: "medicos",
    component: MedicosComponent,
    data: { title: "Medicos" },
    canActivate: [LoginGuard]
  },
  {
    path: "medico/:id",
    component: MedicoComponent,
    data: { title: "Medico" },
    canActivate: [LoginGuard]
  },
  {
    path: "hospitales",
    component: HospitalesComponent,
    data: { title: "Hospitales" },
    canActivate: [LoginGuard]
  },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
