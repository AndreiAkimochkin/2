import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { NgModule } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { RecipeApiService } from '../recipe-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  declarations: [ ],
  bootstrap: [ ]
})

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('showFavorites', [
      state('hide', style({

      })),
      state('show', style({
        top: 0,
        height: '100%',
        width: '400px',
        backgroundColor: '#22a9ff',
        borderRadius: '0px',
        zIndex: '99999'
      })),
      transition('hide => show', [
        animate('.5s')
      ]),
      transition('show => hide', [
        animate('.5s')
      ]),
    ]),
  ],
  providers: [ AuthService, RecipeApiService]
})

export class HomepageComponent {
  showFavorites: boolean = false;
  favorites: FirebaseListObservable<any[]>;
  recipeListShowing: boolean = false;
  private user;
  private isLoggedIn: Boolean;
  private userName: String;
  selectedFavorite = null;

  constructor(private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.userName = user.displayName;
      }
    });
  }
  setParentClass() {
    if (!this.recipeListShowing) {
      return "parent-search-no-recipes";
    } else {
      return "parent-search-showing-recipes";
    }
  }

  setChildClass() {
    if (!this.recipeListShowing) {
      return "home-search-no-recipes";
    } else {
      return "home-search-showing-recipes";
    }
  }

  showRecipes(){
    this.recipeListShowing = true;
  }

  getFavorites(){
    if(this.user !== null){
      this.showFavorites = !this.showFavorites;
      this.favorites = this.authService.getFavorites(this.user.uid);
    }
  }

  closeFavorites(){
    this.showFavorites = !this.showFavorites;
  }

  editFavorite(clickedFavorite) {
    this.selectedFavorite = clickedFavorite;
  }

  finishedEditing(){
    this.selectedFavorite = null;
  }
}
