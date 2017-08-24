import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Listadedesejos } from './listadedesejos';

@NgModule({
  declarations: [
    Listadedesejos,
  ],
  imports: [
    IonicPageModule.forChild(Listadedesejos),
  ],
  exports: [
    Listadedesejos
  ]
})
export class ListadedesejosModule {}
