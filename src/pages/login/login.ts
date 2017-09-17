import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  username:string ;
  password:string ;
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';

  constructor(
  public navCtrl: NavController,
  public Backand: BackandService,
  public toastCtrl: ToastController,
  public userServices: Users)
  {

  }

  showToast(position: string, Texto: string)
  {
    let toast = this.toastCtrl.create({
      message: Texto,
      duration: 2000,
      position: 'center'
  });
    toast.present(toast);
  }

deslogar()
{
  this.userServices.signOut();
}

logar()
{
  this.userServices.getAuthTokenSimple(this.username, this.password);
}
  ionViewDidLoad() {
//    console.log('ionViewDidLoad Login');
  }

}
