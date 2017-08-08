import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Meusclientes } from './meusclientes';

@NgModule({
  declarations: [
    Meusclientes,
  ],
  imports: [
    IonicPageModule.forChild(Meusclientes),
  ],
  exports: [
    Meusclientes
  ]
})
export class MeusclientesModule {}
