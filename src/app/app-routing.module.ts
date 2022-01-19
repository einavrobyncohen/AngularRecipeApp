import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RecipesModule } from './modules/recipe.module';

const routes: Routes = [
  {path:'', component:HomePageComponent},
  {path: 'auth', component:AuthComponent},
  {path: 'recipe', loadChildren:()=> import('./modules/recipe.module').then((m => m.RecipesModule))},
  {path: 'shopping-list', loadChildren:()=> import('./modules/shopping-list.module').then((m => m.shoppingListModule))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
