import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';
import { Users } from '../../providers/users'
import { HomePage } from "../home/home";

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

    showToast(position: string)
    {
      let toast = this.toastCtrl.create({
        message: 'Mmmm, buttered toast',
        duration: 2000,
        position: position
      });
      toast.present(toast);
    }

deslogar()
{
  this.userServices.signOut();
  this.navCtrl.pop();
  this.showToast('middle')
}

logar()
{
  this.userServices.getAuthTokenSimple(this.username, this.password)
  this.navCtrl.pop();
  this.showToast('middle')
}
  ionViewDidLoad() {
//    console.log('ionViewDidLoad Login');
  }

}
