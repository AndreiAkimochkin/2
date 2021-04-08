import { Component, Output, EventEmitter } from '@angular/core';
import { RecipeApiService } from '../recipe-api.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
  providers: [ RecipeApiService ]
})

export class RecipeFormComponent {
  showNoIngreds: boolean = false;

  healths: Preference = [
    {"code": "vegan", "name": "Vegan", "checked": false},
    {"code": "vegetarian", "name": "Vegetarian", "checked": false},
    {"code": "peanut-free", "name": "Peanut free", "checked": false},
    {"code": "tree-nut-free", "name": "Tree nut free", "checked": false},
    {"code": "sugar-conscious", "name": "Sugar conscious", "checked": false},
    {"code": "alcohol-free", "name": "Alcohol free", "checked": false}
  ];

  diets: Preference = [
    {"code": "high-protein", "name": "High protein", "checked": false},
    {"code": "low-fat", "name": "Low fat", "checked": false},
    {"code": "low-carb", "name": "Low carb", "checked": false},
  ]
  @Output() clickSender = new EventEmitter();

  constructor(private recipeApiService: RecipeApiService) { }
    recipes: any[] = null;

   getRecipes(ingredients: string, health: string, diet: string)  {
    this.clickSender.emit();
    this.recipes = [];
    this.recipeApiService.getByIngredients(ingredients, health, diet).subscribe(response => {
      this.recipes = response.json().hits;
    });
  }

createApiCode(ingredients: string, diet: string, health: string) {
    this.showNoIngreds = false;
    if (diet === "") {
      diet = null;
    }
    if (health === "") {
      health = null;
    }
    if(ingredients === '') {
      this.showNoIngreds = true;
    } else {
      let regex = /\s/gi;
      let result = ingredients.replace(regex, '+');
      this.getRecipes(result, health, diet);
    }
  }
}

type Preference = Array<{code: string, name: string, checked: boolean}>;
