import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Estatisticas } from './estatisticas';

@NgModule({
  declarations: [
    Estatisticas,
  ],
  imports: [
    IonicPageModule.forChild(Estatisticas),
  ],
})
export class EstatisticasModule {}
