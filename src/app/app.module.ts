import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import io from 'socket.io-client';
window["io"] = io;
import { SMS } from '@ionic-native/sms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { Usuarios } from '../pages/usuarios/usuarios';
import { Produtos } from '../pages/produtos/produtos';
import { Meuestoque } from '../pages/meuestoque/meuestoque';
import { Meusclientes } from '../pages/meusclientes/meusclientes';
import { Vouvender } from '../pages/vouvender/vouvender';
import { Estoquesegmentado } from '../pages/estoquesegmentado/estoquesegmentado';
import { Compartilhamento } from '../pages/compartilhamento/compartilhamento';
import { Login } from '../pages/login/login';
import { Listadedesejos } from '../pages/listadedesejos/listadedesejos';
import { Estatisticas } from '../pages/estatisticas/estatisticas';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../providers/users';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '277b1cf1'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Usuarios,
    Produtos,
    Meuestoque,
    Vouvender,
    Estoquesegmentado,
    Compartilhamento,
    Login,
    Meusclientes,
    Estatisticas,
    Listadedesejos
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Usuarios,
    Produtos,
    Meuestoque,
    Vouvender,
    Estoquesegmentado,
    Compartilhamento,
    Login,
    Meusclientes,
    Estatisticas,
    Listadedesejos
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SMS,
    BackandService,
    Users,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
