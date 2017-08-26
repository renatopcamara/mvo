import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Meusclientes } from '../meusclientes/meusclientes';
import { SMS } from '@ionic-native/sms';
import { Users } from '../../providers/users'

@Component({
  selector: 'page-vouvender',
  templateUrl: 'vouvender.html',
})
export class Vouvender {

  /* Campos da Tabela Estoques */
  CodEstoque: number;
  nome: string;
  email: string;
  whatsapp: string;
  Status: string;
  ProdutoParaVender: string;
  QuantidadeEscolhida: number;
  Quantidadeemestoque: number;
  Datapgto: string = new Date().toISOString();
  Dataentrega: string = new Date().toISOString();
  Preco: number;
  QtdMax: any;
  NomeCliente: string;
  CodCliente: string;
  NomedoCliente: string;
  NomedoUsuario: string;
  CodProduto:string;
  private items:any[] = [];
  valorfinal: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public userServices: Users,
    private sms: SMS)
  {

  }

  public apagaItemEstoque()
  {

    console.log('Apagando registro do MEuestoque:' + this.CodEstoque)
    this.backand.object.remove('Estoques', this.CodEstoque).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('apaguei item de estoque:' + this.CodEstoque)
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

    public enviaSMS()
  {
    console.log ('Passando pela função de envio de SMS')
    this.sms.send('999971334','Olá. Isso é um teste de envio de SMS pelo MVO')
  }

  fechamentoVenda()
  { let alert = this.alertCtrl.create
    ({
      title: 'ATENÇÂO',
      subTitle: 'Os dados da venda estão corretos? Depois dessa confirmação o registro da venda não poderá ser cancelado.',
      buttons:
      [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Não clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
  //          console.log('Sim clicked');
            this.validaQtdEstoque();
//            this.enviaSMS();
          }
        }
      ]
    });
    alert.present()
  }

  public validaQtdEstoque()
  {
    this.valorfinal = this.Quantidadeemestoque - this.QuantidadeEscolhida;
    if ( this.valorfinal <= 0 )
    {
//      console.log('valor final <= 0');
    }
    else
    {
//      console.log('valor final =' , this.valorfinal, 'Qtd Estoque=' , this.Quantidadeemestoque , 'Qtd Escolhida', this.QuantidadeEscolhida);
      this.atualizaEstoques();
    }
  }

  public atualizaEstoques()
  {
    let data =
    {
      Quantidade: this.Quantidadeemestoque - this.QuantidadeEscolhida
    }
    console.log('ID:'+ this.CodEstoque + 'qtd: ' + data.Quantidade)
    this.backand.object.update('Estoques', this.CodEstoque , data).then
    ((res: any) =>
        {
          this.items = res.data;
          console.log('atualizei a qtd do item de estoque:' + this.CodEstoque);
          this.novaVenda();
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public novaVenda()
  {
    let item =
    {
      IDEstoque: this.CodEstoque,
      Qtd: this.QuantidadeEscolhida,
      ValorPago: this.Preco,
      DataPagamento: this.Datapgto,
      DataEntrega: this.Dataentrega,
      CodProduto: this.ProdutoParaVender,
      idCliente: this.CodCliente,
      NomedoCliente: this.NomeCliente,
      CodUsuario: this.userServices.loggedInUser
    };
    console.log('Cliente:' + this.NomeCliente +' ID:' + this.CodCliente)
    this.backand.object.create('Vendas',item).then
    ((res: any) =>
        {
          console.log('salvei nova venda e voltei a tela...');
          this.navCtrl.pop()
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
    console.log("passei no addcliente do Vouvender");
  }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad Vouvender: ' + this.navParams.get('ID'));
    this.NomeCliente = this.navParams.get('Cliente');
    this.CodCliente = this.navParams.get('CodCliente');
    this.NomedoUsuario = this.navParams.get('Usuario');
    this.CodProduto = this.navParams.get('IDProd');
    this.CodEstoque = this.navParams.get('ID');
    this.ProdutoParaVender = this.navParams.get('Produto');
    this.QuantidadeEscolhida = this.navParams.get('Qtd');
    this.Quantidadeemestoque = this.navParams.get('Qtd');
    this.Preco = this.navParams.get('Preco');
//    console.log('Cliente: ' + this.NomeCliente + ' Cod do Cliente: ' + this.CodCliente);
  }

  ionViewDidEnter() {
//    console.log('ionViewDidEnter Meuestoque');
//    this.getItemsClientes();
  }
}
