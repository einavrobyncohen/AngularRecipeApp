import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecipeListComponent } from "../cmps/recipe-list/recipe-list.component";
import { RecipePreviewComponent } from "../cmps/recipe-preview/recipe-preview.component";
import { RecipeDetailsComponent } from "../pages/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "../pages/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "../pages/recipe-start/recipe-start.component";
import { RecipeComponent } from "../pages/recipe/recipe.component";
import { RecipeRoutingModule } from "./recipe-routing.module";

@NgModule({
    declarations: [
        RecipeComponent,
        RecipeListComponent,
        RecipePreviewComponent,
        RecipeDetailsComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ], 
    imports: [
        RouterModule, CommonModule, ReactiveFormsModule, RecipeRoutingModule
    ]
})

export class RecipesModule {

}