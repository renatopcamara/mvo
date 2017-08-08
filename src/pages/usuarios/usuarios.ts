import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { HomePage } from "../home/home";

@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class Usuarios {

  public email: string = '';
  firstName: string;
  lastName: number;
  id: number;
  public items:any[] = [];
  searchQuery: string;
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  NomedoUsuario: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public backand: BackandService)
  {
    this.searchQuery = '';
    let that = this;
    this.backand.on("items_updated",
      (res: any) => {
        let a = res.data as any[];
        let newItem = {};
        a.forEach((kv)=> newItem[kv.Key] = kv.Value);
        that.items.unshift(newItem);
      }
    );
    this.backand.user.getUserDetails().then
    (
      (res: any) =>
      {
        if(res.data)
        {
          this.loggedInUser = res.data.username;
          this.email = res.data.username;
          this.auth_status = 'OK';
          this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
        }
      },
          (err: any) =>
          {
            this.loggedInUser = null;
            this.auth_status = null;
            this.auth_type = null;
          }
      );
    }

  public getItems()
  {
    this.backand.object.getList('users').then
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

  selecionaUsuario(nome:string)
  {
  console.log(nome)
  this.NomedoUsuario = 'Bem vindo ' + nome;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Usuarios');
  }


}
