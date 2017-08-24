import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BackandService } from '@backand/angular2-sdk';

/*
  Generated class for the Users provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class Users
{
  username:string = '';
  password:string = '';
  auth_type:string = "N/A";
  is_auth_error:boolean = false;
  auth_status:string = null;
  loggedInUser: string = '';
  loggedInUserID: string ='';

  constructor(
    public backand: BackandService)
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
        this.auth_type = res.data.token_type;
        this.loggedInUser = res.data.firstName;
        this.loggedInUserID = res.data.userId;
        this.auth_status = 'OK';
//        console.log('passei no pega usuarios do provider', res.data)
      }).catch(err =>
      {
        console.log(err);
        this.loggedInUser = 'anonymous';
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
      }
    ).catch(err =>
      {
        this.is_auth_error = true;
        console.log(err);
      }
    );
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
