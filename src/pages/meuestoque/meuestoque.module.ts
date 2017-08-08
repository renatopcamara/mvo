import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Meuestoque } from './meuestoque';

@NgModule({
  declarations: [
    Meuestoque,
  ],
  imports: [
    IonicPageModule.forChild(Meuestoque),
  ],
  exports: [
    Meuestoque
  ]
})
export class MeuestoqueModule {}
