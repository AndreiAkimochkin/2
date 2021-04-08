import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
  providers: [AuthService]
})
export class FavoriteListComponent {
  @Input() favList: FirebaseListObservable<any[]>;
  showModal: boolean = false;
  selectedFavorite = null;
  @Output() clickSender = new EventEmitter();
 constructor(private authService: AuthService) { }

  openModal(favoriteToEdit){
    this.showModal = true;
    this.selectedFavorite = favoriteToEdit;
    this.clickSender.emit(favoriteToEdit)
  }

  deleteFavorite(favorite){
    this.authService.deleteFavorite(favorite);
  }

}
