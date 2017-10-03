import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, List, AlertController, ModalController, ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'
import { Meusclientes } from '../meusclientes/meusclientes';

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
NomeCliente: string;
CodCliente: string = ' ';
Vazio: number;

  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public backand: BackandService,
    public modalCtrl: ModalController,
    public userServices: Users,
    public toastCtrl: ToastController)
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
          if (this.items.length ==0)
          {
            this.Vazio = 0
          }
          else
          {
            this.Vazio = 1
          }
          console.log(this.items);
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  retiradesejos(indice)
  {
    this.list.closeSlidingItems();
    let alert = this.alertCtrl.create(
    {
      title: 'DESISTIR',
      subTitle: 'Deseja realmente desistir desse desejo?',
      buttons:[
      {
        text: 'Não',
        role: 'cancel',
        handler: () => {
          console.log('Não clicked');
        }
      },
      {
        text: 'Sim',
        handler: () =>
        {
          this.presentToast('operação sendo registrada...');
          this.backand.object.remove('Desejos', indice).then
          ((res: any) =>
          {
//            console.log('apagando indice '+ indice);

            this.getItems();
          },(err: any) =>
          {
            console.log(err.data);
          });
        }
      }]
    });

    alert.present()
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
//    console.log("Item ID do desejo" , this.DesejoID);
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
    this.presentToast('operação sendo registrada...');
    this.backand.object.create('Estoques',item).then
    ((res: any) =>
      {
//        console.log('desejo salvo em estoque');
        this.backand.object.remove('Desejos',DesireID).then
        ((res: any) =>
          {
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

  private presentToast(mensagem) {
      let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: "middle"
      });
      toast.present();
    }

  ionViewDidLoad()
  {
    this.NomeCliente = this.navParams.get('Cliente');
    this.CodCliente = this.navParams.get('CodCliente');
//    console.log('ionViewDidLoad Listadedesejos');
  }

}
