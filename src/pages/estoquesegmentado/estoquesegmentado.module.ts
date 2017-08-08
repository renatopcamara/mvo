import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Estoquesegmentado } from './estoquesegmentado';

@NgModule({
  declarations: [
    Estoquesegmentado,
  ],
  imports: [
    IonicPageModule.forChild(Estoquesegmentado),
  ],
  exports: [
    Estoquesegmentado
  ]
})
export class EstoquesegmentadoModule {}
