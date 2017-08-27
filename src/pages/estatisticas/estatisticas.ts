import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Meusclientes } from '../meusclientes/meusclientes';
import { SMS } from '@ionic-native/sms';
import { Users } from '../../providers/users'


@Component({
  selector: 'page-estatisticas',
  templateUrl: 'estatisticas.html',
})
export class Estatisticas {
public items:any[] = [];

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public backand: BackandService,
  public userServices: Users)
  {
    this.pegadadosUsuario()
    this.carregaVendas()
  }

  private pegadadosUsuario()
  {
    this.userServices.pegaUsuario()
  }

  public carregaVendas()
  {
    let params =
    {

      filter: this.backand.helpers.filter.create('CodUsuario', 'equals', this.userServices.loggedInUser),
  //      filter: this.backand.helpers.filter.create('idCliente', 'equals', '34'),
    }
  //    console.log('parametros:'+ params)
    this.backand.query.get('Vendas',params).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log(res.data);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad Estatisticas');
  }

}
