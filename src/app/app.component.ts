import { SigninPage } from './../pages/signin/signin';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { TabsPage } from './../pages/tabs/tabs';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen, 
              private menuCtrl: MenuController,
              private authService: AuthService) {

    //firebase initialization
    firebase.initializeApp({
      apiKey: "AIzaSyCzKfOM7xhTLZpOsCvvC3m4PsxK9bpg6vA",
      authDomain: "ionic-http.firebaseapp.com",
    })

    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else{
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }


}

