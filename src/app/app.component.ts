import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Vouvender } from '../pages/vouvender/vouvender';
import { Compartilhamento } from '../pages/compartilhamento/compartilhamento';
import { Produtos } from '../pages/produtos/produtos';
import { Login } from '../pages/login/login';
import { Estatisticas } from '../pages/estatisticas/estatisticas';


import { BackandService } from '@backand/angular2-sdk';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public backand: BackandService)
    {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
//      { title: 'Meus Estoques', component: Estoquesegmentado },
//      { title: 'Vou Vender', component: Vouvender },
//      { title: 'Meus Clientes', component: Meusclientes },
//      { title: 'Catálogo de Produtos', component: Produtos },
//      { title: 'Compartilhamentos', component: Compartilhamento },
      { title: 'Estatísticas', component: Estatisticas },
      { title: 'Log In', component: Login }
//      { title: 'List Page', component: ListPage}
      ];
    }

  initializeApp()
  {
    this.platform.ready().then
    (() =>
      {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.backand.init
        ({
          appName: 'mvo',
          signUpToken: '26b3d69d-8f69-4719-9335-f785edc8b3de',
          anonymousToken: '06646723-1e1d-46a3-86c8-8a18b17f834d',
          runSocket: true,
          mobilePlatform: 'ionic'
//          appName: 'mvopoc',
//          signUpToken: '8efa1a4f-32d8-435c-9e49-7d54bb4991e1',
//          anonymousToken: '38396332-f6e2-48d8-950c-bd6a2e4f1633',
//          runSocket: true,
//          mobilePlatform: 'ionic'
        });
      }
    );
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
