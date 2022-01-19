
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShoppingEditComponent } from "../cmps/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "../pages/shopping-list/shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            {path: '', component: ShoppingListComponent}
        ]), FormsModule, CommonModule
    ]
})

export class shoppingListModule {

}