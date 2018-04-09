import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { UserService } from '../../providers/user-service/user-service';
import { IndexPage } from '../index';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user={
    email:"",
    password:"",
    password2:""
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private AuthService:UserService,
    private toastCtrl:ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register(){
    if(this.user.password===this.user.password2){
      this.AuthService.register(this.user.email,this.user.password)
      .then(()=>{
        if(this.AuthService.isRegisterSuccess){
          this.AuthService.isRegisterSuccess=false;
          this.navCtrl.setRoot(IndexPage)
        }
      });
    }
    else{
      this.presentToast("Passwords need to be identical.");
    }
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast', message);
    });

    toast.present();
  }
}
