import { AuthService } from './../../services/auth';
import { SLOptionsPage } from './sl-options/sl-options';
import { Ingredient } from './../../models/ingredient';
import { ShoppingListService } from './../../services/shopping-list';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

 listItems: Ingredient[];

 constructor(private slService: ShoppingListService,
             private popoverCtrl: PopoverController,
             private authService: AuthService,
             private loadingCtrl: LoadingController) {}

  ionViewWillEnter(){
    this.loadItems();
  }

  onAddItem(form: NgForm){
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent){
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(SLOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data=> {
        if(data.action == 'load'){
          loading.present();
          this.authService.getActiveUser().getToken()
          .then(
            (token: string) => {
              this.slService.fetchList(token)
                .subscribe(
                  ( list: Ingredient[]) => {
                    loading.dismiss();
                    if(list){
                      this.listItems = list;
                    } else{
                      this.listItems = [];
                    }
                  },
                  error =>{
                    loading.dismiss();
                    console.log(error);
                  }
                );
            }
          );

        }else if (data.action == 'store') {
          /*returns a promise bc it checks if the token is expired or not
            if it is, it automatically refresh it for us. Might need to do this on my 
            own */
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.slService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error =>{
                      loading.dismiss();;
                    }
                  );
              }
            );
        }
      }
    );
  }

  private loadItems(){
    this.listItems = this.slService.getItems();
    
  }

}
