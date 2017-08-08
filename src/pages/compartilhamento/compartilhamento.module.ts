import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Compartilhamento } from './compartilhamento';

@NgModule({
  declarations: [
    Compartilhamento,
  ],
  imports: [
    IonicPageModule.forChild(Compartilhamento),
  ],
  exports: [
    Compartilhamento
  ]
})
export class CompartilhamentoModule {}
