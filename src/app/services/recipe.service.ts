import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new Subject<Recipe>();
  recipesChanges = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) { }

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe('Test Recipe',
  //     'Its a test',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French fries', 20)
  //     ]),
  //   new Recipe('Another Test Recipe',
  //     'Its an Another test',
  //     'https://static.onecms.io/wp-content/uploads/sites/23/2021/11/07/creamy-potato-cabbage-soup-recipe1221DIN.jpg',
  //     [
  //       new Ingredient('Buns', 3),
  //       new Ingredient('Ketchup', 1)
  //     ])
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipes  = recipes
    this.recipesChanges.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {

    return this.recipes[index];

  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesChanges.next(this.recipes.slice())

  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanges.next(this.recipes.slice())
  }

  addIngredientsToSL(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient)

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index,1)
    this.recipesChanges.next(this.recipes.slice())
  }

  
}
