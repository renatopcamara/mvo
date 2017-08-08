import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Vouvender } from './vouvender';

@NgModule({
  declarations: [
    Vouvender,
  ],
  imports: [
    IonicPageModule.forChild(Vouvender),
  ],
  exports: [
    Vouvender
  ]
})
export class VouvenderModule {}
