import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, List, AlertController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'

/**
 * Generated class for the Listadedesejos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-listadedesejos',
  templateUrl: 'listadedesejos.html',
})
export class Listadedesejos {

@ViewChild(List) list: List;

items:any[] = [];
DesejoID: string;

  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public backand: BackandService,
    public userServices: Users)
  {
    this.getItems()
  }

  getItems()
  {
    let params =
    {
      filter: this.backand.helpers.filter.create('CodUsuario', 'contains', this.userServices.loggedInUser)
    }
    this.backand.object.getList('Desejos', params).then
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

  retiradesejos(indice)
  {
    this.backand.object.remove('Desejos', indice).then
    ((res: any) =>
        {
          console.log('apagando indice '+ indice);
          this.getItems();
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  compradesejo(infos)
  {
    this.list.closeSlidingItems();
    let item =
    {
      NumeroPedido: '',
      NomedoProduto: infos.NomedoProduto,
      Quantidade: infos.Quantidade,
      Status: "em estoque",
      CodProduto: infos.CodProduto,
      DataChegada: new Date().toISOString(),
      CodUsuario: this.userServices.loggedInUser,
      Preco: infos.Preco
    }
    console.log(item);
    this.DesejoID = infos.id;
    console.log("Item ID do desejo" , this.DesejoID);
    this.DesejoviraEstoque(item, this.DesejoID);
  }


  compratodosdesejos(infos)
  {
    this.list.closeSlidingItems()

    let alert = this.alertCtrl.create
    ({
      title: 'Importante',
      subTitle: 'Entrar com a informação abaixo:',
      inputs:
      [{
          name: 'pedido',
          placeholder: 'Número do Pedido',
          type: 'number'
        }
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
            if (data.pedido == '' )
            {
              console.log('Número do pedido zerado');
            } else
            {
              let item =
              {
                NumeroPedido: data.pedido,
                NomedoProduto: infos.NomedoProduto,
                Quantidade: infos.Quantidade,
                Status: "em estoque",
                CodProduto: infos.CodProduto,
                DataChegada: new Date().toISOString(),
                CodUsuario: this.userServices.loggedInUser,
                Preco: infos.Preco
              };
              console.log(item);
              this.DesejoID = infos.id;
              console.log("Item ID do desejo" , this.DesejoID);
              this.DesejoviraEstoque(item, this.DesejoID);
              return true;
            }
          }
        }
      ]
    });
    alert.present();
  }

  public DesejoviraEstoque(item,DesireID)
  {
    this.backand.object.create('Estoques',item).then
    ((res: any) =>
      {
        console.log('desejo salvo em estoque');
        this.backand.object.remove('Desejos',DesireID).then
        ((res: any) =>
          {
            console.log('desejo apagado:' + DesireID);
            this.getItems();
          },(err: any) =>
          {
            alert(err.data);
          }
        );
      },(err: any) =>
      {
        alert(err.data);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Listadedesejos');
  }

}
