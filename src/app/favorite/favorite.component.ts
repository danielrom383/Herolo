import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { FavoritesStoreService } from 'src/app/shared/services/favorite-store.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

 
  constructor(private favoritesStore: FavoritesStoreService) { }
  favorites: Favorite[];
  ngOnInit() {
    this.favoritesStore.favorites$.subscribe(res => this.favorites = res);
  }
}

