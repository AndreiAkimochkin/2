import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { RecipeApiService } from './recipe-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, RecipeApiService]
})
export class AppComponent {
  }
