import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'

/**
 * Generated class for the Compartilhamento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-compartilhamento',
  templateUrl: 'compartilhamento.html',
})
export class Compartilhamento {
public items:any[] = [];
visibilidade : boolean;
compart: boolean = true;

  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  public backand: BackandService,
  public userServices: Users)
  {


  }

  public carregaUsuarios()
  {
    let params =
    {
  //    filter: this.backand.helpers.filter.create('idCliente', 'equals', this.CodCliente),
  //      filter: this.backand.helpers.filter.create('idCliente', 'equals', '34'),
  //    sort: this.backand.helpers.sort.create('DataPagamento', 'desc'),
    }
  //    console.log('parametros:'+ params)
    this.backand.object.getList('Users',params).then
    ((res: any) =>
        {
          this.items = res.data;
          for ( let data of this.items)
          {
            if (data.firstName == this.userServices.loggedInUser)
            {
//              console.log(data.firstName, data.Visible)
              this.visibilidade = data.Visible;
            }
          }
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

    public atualizaUser()
  {
    let data =
    {
    	Visible: this.visibilidade
    }
    this.backand.object.update('users', this.userServices.loggedInUserID , data).then
    ((res: any) =>
        {
//          this.items = res.data;
          console.log('salvei visibilidade:' , this.visibilidade , "do cliente: " ,this.userServices.loggedInUserID );
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Compartilhamento');
  }

  ionViewDidEnter()
  {
  //  console.log('ionViewDidEnter Home');
    this.carregaUsuarios();
  }

}
