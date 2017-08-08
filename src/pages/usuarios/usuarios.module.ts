import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Usuarios } from './usuarios';

@NgModule({
  declarations: [
    Usuarios,
  ],
  imports: [
    IonicPageModule.forChild(Usuarios),
  ],
  exports: [
    Usuarios
  ]
})
export class UsuariosModule {}
