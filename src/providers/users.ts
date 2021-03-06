import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BackandService } from '@backand/angular2-sdk';
import { ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the Users provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Users
{
  username: string;
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  loggedInUserID: string ='';
  Compartilha: boolean;

  constructor(
    public backand: BackandService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController)
  {
//    console.log('Hello Users Provider');
  }

  public pegaUsuario()
  {
//    if (this.auth_status  == 'OK')
//    {
      this.backand.user.getUserDetails().then
      (res =>
      {
        this.loggedInUser = res.data.firstName;
        this.loggedInUserID = res.data.userId;
        this.auth_status = 'OK';
        this.Compartilha = res.data.Visible;
        //  this.auth_type = res.data.token_type;
        this.auth_type = res.data.token_type == 'Anonymous' ? 'Anonymous' : 'Token';
//        console.log('passei no pega usuarios do provider', res.data)
      }).catch(err =>
      {
        console.log(err);
        this.loggedInUser = 'anonymous';
        this.auth_status = null;
        this.auth_type = null;
      });
//    }
  }

  public getAuthTokenSimple(username,password)
  {

    this.auth_type = 'Token';
    this.backand.signin(username,password).then
    (res =>
      {
        this.auth_status = 'OK';
        this.is_auth_error = false;
        this.loggedInUser = this.username;
        this.username = '';
        this.password = '';
//      console.log('signin succeeded with user:' + res.data.username);
        this.pegaUsuario();
      }
    ).catch(err =>
      {
        let errorMessage: string = err.data.error_description;
        this.auth_status = `Error: ${errorMessage}`;
        this.is_auth_error = true;
        console.log(this.auth_status , " - " , this.is_auth_error);
        this.showAlert(this.auth_status);
      }
    );
  }

  public showToastConnection(Texto: string)
  {
    let toast = this.toastCtrl.create({
      message: Texto,
      duration: 3000,
      position: 'middle'
  });
    toast.present(toast);
  }

  private showAlert(Texto)
  {
    let alert = this.alertCtrl.create({
      title: 'Error Message',
      subTitle: Texto,
      buttons: ['OK']
    });
    alert.present();
  }

  public signOut()
  {
    this.auth_status = null;
    this.loggedInUser = 'anonymous';
    this.loggedInUserID = null;
    this.backand.signout().then
    (res =>
      {
//      console.log('signout succeeded with user:' + res.data);
      }
    ).catch(err =>
      {
        console.log(err);
      }
    );
  }



}
