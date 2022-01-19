import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes : Recipe[]
  subscription: Subscription

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanges.subscribe((recipes:Recipe[]) => {
      this.recipes = recipes;
      
    })
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
