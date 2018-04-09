import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';


@Injectable()
export class UserService {
  isLoggedIn:boolean=false;
  isRegisterSuccess: boolean = false;

  constructor(public afAuth: AngularFireAuth, public toastCtrl:ToastController) {
    console.log('Hello UserService Provider');
  }

  loginWithGoogle(){
    return this.afAuth.auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login(email:string,password:string){
    return this.afAuth.auth
    .signInWithEmailAndPassword(email,password)
    .then((result)=>{
      console.log("login result",result);
      this.isLoggedIn= true;
    })
    .catch((error)=>{
      this.displayError(error,"Error during login.")
    })
  }
  displayError(error:any,message:string)
  {
    console.log(message,error);
    this.presentToast(error.message);
    this.isLoggedIn=false;
  }
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      console.log("register result", result);
      this.isRegisterSuccess= true;
    })
    .catch((error)=>{
      this.displayError(error,"Error during register.");
    })
  }
  logout(){
    this.afAuth.auth.signOut();
    this.isLoggedIn=false;
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast',message);
    });
  
    toast.present();
  }
}