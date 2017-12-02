import { RecipePage } from './../recipe/recipe';
import { Recipe } from './../../models/recipe.model';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private navCtrl: NavController,
              private recipeService: RecipesService) {}

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number){
    this.navCtrl.push(RecipePage,{recipe: recipe, index: index});
  }

}
