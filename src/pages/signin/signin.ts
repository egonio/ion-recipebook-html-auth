import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AuthService } from './../../services/auth';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController){}

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content:'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then( data =>{
        loading.dismiss();
      })
      .catch( error =>{
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
