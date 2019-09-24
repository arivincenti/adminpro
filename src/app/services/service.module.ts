import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SidebarService, SharedService, UsuarioService, UploadFilesService, ModalUploadFilesService, HospitalesService, LoginGuard, AdminGuard, VerificaTokenGuard} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    UploadFilesService,
    ModalUploadFilesService,
    HospitalesService,
    AdminGuard,
    LoginGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
