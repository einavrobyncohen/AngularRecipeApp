import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  @Input() recipes: Recipe[];


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo: this.route})

  }


  
}
