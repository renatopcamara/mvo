import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Produtos } from '../produtos/produtos';
import { Meusclientes } from '../meusclientes/meusclientes';
import { Vouvender } from '../vouvender/vouvender';
import { Estoquesegmentado } from '../estoquesegmentado/estoquesegmentado';
import { Compartilhamento } from '../compartilhamento/compartilhamento';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public items:any[] = [];
searchQuery: string;
username:string = '';
password:string = '';
auth_type:string = "N/A";
is_auth_error:boolean = false;
auth_status:string = null;
loggedInUser: string = '';

public UsuarioLogado: string;
NomeCliente: string = ' ';
CodCliente: string = ' ';
NomedoUsuario: string = 'Rosana';
DataPagamento: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public backand: BackandService)
  {

  }

  launchModalMeuscliente()
  {
    let modal = this.modalCtrl.create(Meusclientes);

    modal.onDidDismiss((data)=>
    {
//      console.log("Cliente: " + data.NomeCliente + " COD:" + data.CodCliente);
      this.NomeCliente = data.NomeCliente;
      this.CodCliente = data.CodCliente;
      this.carregaVendas();
    });
    modal.present();
//    console.log("passei no launchModalPage");
  }

  public carregaVendas()
  {
    let params =
    {
      filter: this.backand.helpers.filter.create('idCliente', 'equals', this.CodCliente),
//      filter: this.backand.helpers.filter.create('idCliente', 'equals', '34'),
      sort: this.backand.helpers.sort.create('DataPagamento', 'desc'),
    }
//    console.log('parametros:'+ params)
    this.backand.object.getList('Vendas',params).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('Passeio no carrega vendas' + this.items);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public abreMeuestoque()
  {
    let data =
    {
      Cliente: this.NomeCliente,
      CodCliente: this.CodCliente,
      Usuario: this.NomedoUsuario
    };
//    console.log ('preparando envio de daddos' + data.Cliente + data.Usuario)
    this.navCtrl.push(Estoquesegmentado, data)
  }

  public abreVouvender()
  {
    let data =
    {
      Cliente: this.NomeCliente,
      CodCliente: this.CodCliente,
      Usuario: this.NomedoUsuario
    };
    this.navCtrl.push(Vouvender, data)
  }

  public abreProdutos()
  {
    this.navCtrl.push(Produtos)
  }

  public abreCompartilhar()
  {
    this.navCtrl.push(Compartilhamento)
  }

  ionViewDidLoad()
  {
//    console.log('ionViewDidLoad Home');
  }
  ionViewDidEnter()
  {
  //  console.log('ionViewDidEnter Home');
    this.carregaVendas();
  }
}
