import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'

@Component({
  selector: 'page-meusclientes',
  templateUrl: 'meusclientes.html',
})
export class Meusclientes {

  /* Campos da Tabela Estoques */
  id: number;
  nome: string =' ';
  email: string;
  whatsapp: string;
  fixo: string;
  Status: string;

  public items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  NomedoUsuario: string = '';
  NomeCliente: string = ' ';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userServices: Users,
    public backand: BackandService)
  {
  }

  public getItems()
  {
    let params =
    {
      filter: this.backand.helpers.filter.create('CodUsuario', 'equals', this.userServices.loggedInUser),
      sort: this.backand.helpers.sort.create('Nome', 'asc')
    }
    this.backand.object.getList('Clientes',params).then
    ((res: any) =>
        {
          this.items = res.data;
  //        console.log('itens lidos....');
        },(err: any) =>
        {
          alert(err.data);
        }
    );
  }

  public novoItem()
  {
    let item =
    {
      Nome: this.nome,
      Email: this.email,
      Whatsapp: this.whatsapp,
      Fixo: this.fixo,
      Status: 'Ativo',
      CodUsuario: this.userServices.loggedInUser
    };
//    console.log(item)
    if (item.Whatsapp && item.Nome)
      this.backand.object.create('clientes',item).then
      ((res: any) =>
          {
//            console.log(item);
            this.id=null;
            this.nome=' ';
            this.email="";
            this.whatsapp="";
            this.fixo="";
            this.closeModal(item);
          },(err: any) =>
          {
            alert(err.data);
          }
      );
  }

  public carregaDados(registro)
  {
    this.id=registro.id;
    this.nome=registro.nome;
    this.email=registro.email;
    this.whatsapp=registro.whatsapp;
    this.fixo=registro.fixo;
//    console.log('registros de atualização' + registro.id)
  }

  public Deletar(indice)
  {
    this.backand.object.remove('clientes', indice).then
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

  public atualizar()
  {
    let item =
    {
      Nome: this.nome,
      Email: this.email,
      Whatsapp: this.whatsapp,
      Fixo: this.fixo,
    };
    console.log('autalizando o ID ' + this.id)
    if (item.Whatsapp && item.Nome)
      this.backand.object.update('clientes', this.id, item).then
      ((res: any) =>
          {
            console.log('atualizado...');
            this.id=0;
            this.nome=" ";
            this.email="";
            this.whatsapp="";
            this.fixo=";"
          },(err: any) =>
          {
            alert(err.data);
          }
      );
  }

  closeModal(infos)
  {
    let data =
    {
      NomeCliente: infos.Nome,
      CodCliente: infos.id
    }
    this.viewCtrl.dismiss(data);
  }

  ionViewDidLoad()
  {
//    console.log('ionViewDidLoad Meusclientes');
  }

  ionViewDidEnter() {
    this.getItems();
  }

}
