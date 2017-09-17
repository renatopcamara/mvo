import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ModalController, LoadingController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Produtos } from '../produtos/produtos';
import { Meusclientes } from '../meusclientes/meusclientes';
import { Vouvender } from '../vouvender/vouvender';
import { Estoquesegmentado } from '../estoquesegmentado/estoquesegmentado';
import { Compartilhamento } from '../compartilhamento/compartilhamento';
import { Login } from '../login/login';
import { Users } from '../../providers/users'
import { Listadedesejos } from '../listadedesejos/listadedesejos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

public items:any[] = [];
public lucro:any[] = [];
searchQuery: string;

public UsuarioLogado: string;
NomeCliente: string = ' ';
CodCliente: string = ' ';
NomedoUsuario: string;
DataPagamento: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public backand: BackandService,
    public userServices: Users)
  {
    //this.userServices.showToastConnection('auth status: ' +this.userServices.auth_status + "authloggeuser: " + this.userServices.loggedInUser)
  //  if (this.userServices.loggedInUser =='')
    //{
    //  console.log("nnn"+this.userServices.loggedInUser+"nnn");
  //  }
    //console.log("nnn"+this.userServices.loggedInUser+"nnn");

  }

  private carregaLucro()
  {
    let params =
    {
      usuario: this.userServices.loggedInUser,
    }
    this.backand.query.get('LucroTotal',params).then
    ((res: any) =>
        {
          this.lucro = res.data;
  //        console.log(res.data);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public abrelistaDesejo()
  {
    let data =
    {
      Cliente: this.NomeCliente,
      CodCliente: this.CodCliente,
      Usuario: this.NomedoUsuario
    };
    this.navCtrl.push(Listadedesejos,data);
  }

  private pegadadosUsuario()
  {
    this.userServices.pegaUsuario()
  }

  public abreLogin()
  {
    this.navCtrl.push(Login)
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
      this.carregaLucro();
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
//          console.log('Passeio no carrega vendas' + this.items);
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
    let data =
    {
      Cliente: this.NomeCliente,
      CodCliente: this.CodCliente,
      Usuario: this.NomedoUsuario
    };
    console.log(data);
    this.navCtrl.push(Produtos, data)
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
    this.pegadadosUsuario();
    this.carregaLucro();
  }
}
