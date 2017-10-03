import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, List, ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Vouvender } from '../vouvender/vouvender';
import { Meusclientes } from '../meusclientes/meusclientes';
import { Users } from '../../providers/users'

/**
 * Generated class for the Estoquesegmentado page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-estoquesegmentado',
  templateUrl: 'estoquesegmentado.html',
})
export class Estoquesegmentado {

  @ViewChild(List) list: List;

  private items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  email: string = '';
  NomeCliente: string;
  CodCliente: string;
  NomedoUsuario: string;
  origem:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public userServices: Users,
    public backand: BackandService)
  {
    this.origem = "mine";
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
  }

  public getItemsMeuEstoque()
  {
    let params =
    {
      filter: this.backand.helpers.filter.create('CodUsuario', 'contains', this.userServices.loggedInUser),
      sort: this.backand.helpers.sort.create('NomedoProduto', 'asc')
    }
//    console.log('parametros:'+params)
    this.backand.object.getList('Estoques',params).then
    ((res: any) =>
        {
          this.items = res.data;
//          console.log('Passeio no meu estoque');
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

public getItemsOutrosEstoques()
{
  let params =
  {
    filter: this.backand.helpers.filter.create('CodUsuario', 'notEquals', this.userServices.loggedInUser),
    sort: this.backand.helpers.sort.create('NomedoProduto', 'asc')
  }
//  console.log('parametros:'+params)
  this.backand.object.getList('Estoques',params).then
  ((res: any) =>
      {
        this.items = res.data;
  //      console.log('Passei no estoque dos outros');
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
    filter: this.backand.helpers.filter.create('NomedoProduto', 'contains', q),
    sort: this.backand.helpers.sort.create('NomedoProduto', 'asc')
  }
  this.backand.object.getList('Estoques', params).then
  ((res: any) =>
      {
        this.items = res.data;
  //      console.log('passou no getlist com filtro');
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

private verificaNomeCliente()
{
  if (this.NomeCliente == ' ')
  {
    let alert = this.alertCtrl.create
    ({
      title: 'Atenção',
      subTitle: 'Antes de vender algum produto voce deve selecionar o cliente.' ,
      buttons:
      [{
        text: 'Ok',
        role: 'cancel',
        handler: () => {
//          console.log('Não clicked');
          this.navCtrl.pop();
          }
      }]
    });
    alert.present();
  }
}

VouVender(nomeProduto)
{
  this.list.closeSlidingItems()
  this.verificaNomeCliente();
  let data =
  {
    Cliente: this.NomeCliente,
    CodCliente: this.CodCliente,
    Usuario: this.NomedoUsuario,
    IDProd: nomeProduto.CodProduto,
    ID: nomeProduto.id,
    Produto: nomeProduto.NomedoProduto,
    Qtd: nomeProduto.Quantidade,
    Preco: nomeProduto.Preco
  };
//  console.log("para formação do data Codigo do clinte: " + this.CodCliente);
  this.navCtrl.push(Vouvender, data)
}

  addCliente()
  {
    let modal = this.modalCtrl.create(Meusclientes);
    modal.onDidDismiss((data)=>
    {
      console.log("Vou Vender. Cliente: " + data.NomeCliente + " COD:" + data.CodCliente);
      this.NomeCliente = data.NomeCliente;
      this.CodCliente = data.CodCliente;
    });
    modal.present();
//    console.log("passei no addcliente do estoquesegmentado");
  }

  listadedesejos(nomeProduto,Modelo)
  {
    this.list.closeSlidingItems()

    let alert = this.alertCtrl.create
    ({
      title: 'Aviso',
      subTitle: 'Qual a quantidade de produtos que você deseja?',
      inputs:
      [{
          name: 'qtd',
          placeholder: 'Quantidade',
          type: 'tel',
        },
      ],
      buttons:
      [{
        text: 'Desistir',
        role: 'cancel',
        handler: data =>
          {
            console.log('Cancelou');
          }
        },
        {
          text: 'Salvar',
          handler: data =>
          {
            if (data.qtd == 0 )
            {
  //              console.log('Quantidade desejada zero');
            } else
            {
  //              console.log('Salvou quantidade desejada:' + data.qtd);
              let item =
              {
                NomedoProduto: nomeProduto.NomedoProduto,
                Quantidade: data.qtd,
                CodProduto: nomeProduto.CodProduto,
                CodUsuario: this.userServices.loggedInUser,
                //CodUsuario: nomeProduto.CodUsuario,
                Preco: nomeProduto.Preco,
                NomeCliente: this.NomeCliente,
                Status: Modelo,
                Fornecedor: nomeProduto.CodUsuario
              };
              this.SalvaNovoDesejo(item);
              return true;
            }
          }
        }
      ]
    });
    alert.present();
  }

  SalvaNovoDesejo(item)
  {
    console.log(item)
    this.backand.object.create('Desejos',item).then
    ((res: any) =>
      {
  //        console.log('salvei desejo...');
      },(err: any) =>
      {
        alert(err.data);
      }
    );
  }

  ionViewDidEnter()
  {
//    console.log('ionViewDidLoad Estoquesegmentado');
    this.getItemsMeuEstoque();
    this.searchQuery='';
  }

  ionViewDidLoad()
  {
    this.NomeCliente = this.navParams.get('Cliente');
    this.CodCliente = this.navParams.get('CodCliente');
    this.NomedoUsuario = this.navParams.get('Usuario');
//    console.log('Código do cliente recebido: ' + this.CodCliente);
  }

}
