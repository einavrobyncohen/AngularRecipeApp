import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "../cmps/common/alert/alert.component";
import { LoadingComponent } from "../cmps/common/loading/loading.component";
import { DropdownDirective } from "../directives/dropdown.directive";
import { PlaceholderDirective } from "../directives/placeholder.directive";


//NOT IN USE// 


@NgModule({
    declarations:[AlertComponent, LoadingComponent, PlaceholderDirective, DropdownDirective],
    imports:[CommonModule],
    exports: [AlertComponent, LoadingComponent, PlaceholderDirective, DropdownDirective, CommonModule]
})

export class sharedModule {

}