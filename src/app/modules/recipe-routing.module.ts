import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "../guards/auth-guard.guard";
import { RecipeDetailsComponent } from "../pages/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "../pages/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "../pages/recipe-start/recipe-start.component";
import { RecipeComponent } from "../pages/recipe/recipe.component";
import { RecipesResolver } from "../resolvers/recipes-resolver.resolver";

const routes: Routes = [
    {
        path: '', component: RecipeComponent, canActivate: [AuthGuardGuard], children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolver] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] }

        ]
    },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {

}