import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { IndexPage } from '../index/index';
import { UserService } from '../../providers/user-service/user-service';
import { SignupPage } from '../signup/signup';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

user =
{
  email:"",
  password:""
}
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userService: UserService,
    private menuCtrl:MenuController) 
    {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    
    console.log('tried to login in with:', this.user);
    this.userService.login(this.user.email, this.user.password)
    .then((result)=>
    {
      
      if(this.userService.isLoggedIn){
        this.navCtrl.setRoot(IndexPage);
      
    }
    });
      }
      register(){
        this.navCtrl.push(SignupPage);
      }
}
