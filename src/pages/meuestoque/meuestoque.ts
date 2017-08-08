import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { Vouvender } from '../vouvender/vouvender';

@Component({
  selector: 'page-meuestoque',
  templateUrl: 'meuestoque.html',
})

export class Meuestoque {
  /* Campos da Tabela Estoques */
  id: number;
  creadetAt: Date;
  updatedAt: Date;
  NumeroPedido: string = '';
  NomeProduto: string;
  QtdProduto: number;
  DataChegada: Date;
  DataPrevistaChegada: Date;
  CodProduto: string;
  CodUsuario: string;
  Status: string;

  private items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  NomedoUsuario: string = '';
  email: string = '';
  public ProdutoParaVender: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public alertCtrl: AlertController)
    {

      this.searchQuery = '';
      let that = this;
      this.backand.on("items_updated", (res: any) =>
      {
        let a = res.data as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.items.unshift(newItem);
      });
      this.backand.user.getUserDetails().then
      ((res: any) =>
      {
        if(res.data)
        {
          this.loggedInUser = res.data.username;
          this.email = res.data.username;
          this.auth_status = 'OK';
          this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
      },(err: any) =>
        {
          this.loggedInUser = null;
          this.auth_status = null;
          this.auth_type = null;
        }
      );
      this.getItemsMeuEstoque();
    }

  public getItemsMeuEstoque()
  {
    let params =
    {
      sort: this.backand.helpers.sort.create("CodUsuario", "asc")
    }
    console.log('parametros:'+params)
    this.backand.object.getList('Estoques',params).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log(this.items);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public filterItemsMeuEstoque(searchbar)
  {
    // set q to the value of the searchbar
    var q = searchbar;

    // if the value is an empty string don't filter the items
    if (!q || q.trim() == '')
    {
      return;
    }
    else
    {
      q = q.trim();
    }
    console.log('busca' + q);

    let params =
    {
      filter: this.backand.helpers.filter.create('NomedoProduto', 'contains', q)
    }
    this.backand.object.getList('Estoques', params).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('passou no getlist com filtro');
          this.navCtrl.getActive()
        },(err: any) =>
        {
          alert(err.data);
        }
      );
    }

  detalhesProduto()
  {
    let alert = this.alertCtrl.create
    ({
      title: 'Aviso',
      subTitle: ' No futuro será apresentado a imagem do catálogo do produto selecionado.' ,
      buttons: ['OK']
    });
    alert.present();
  }

  VouVender(nomeProduto)
  {
    this.ProdutoParaVender = nomeProduto;
    this.navCtrl.push(Vouvender)
  }

  Chegou(nomeProduto)
  {
    let alert = this.alertCtrl.create
    ({
      title: 'Chegou',
      subTitle: ' ' + nomeProduto,
      buttons: ['OK']
    });
    alert.present();
    this.filterItemsMeuEstoque(this.searchQuery);
  }

  refreshListMeuestoque()
  {
      this.searchQuery=""
      this.getItemsMeuEstoque();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Meuestoque');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter Meuestoque');
    this.getItemsMeuEstoque();
  }
}
