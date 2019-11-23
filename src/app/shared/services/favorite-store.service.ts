import { Injectable, Output, EventEmitter } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritesStoreService {

  constructor() {
    this.init();
  }

  private readonly _favorites = new BehaviorSubject<Favorite[]>([]);
  readonly favorites$ = this._favorites.asObservable();
  public storageKey: string = 'favorites';

  private get favorites(): Favorite[] {
    return this._favorites.getValue();
  }

  private set favorites(val: Favorite[]) {
    this._favorites.next(val);
    this.addToStorage();
  }

  init(): void {
    let data = localStorage.getItem(this.storageKey);
    if (data)
      this.favorites = JSON.parse(data);
  }

//used to add to favorite list
  addFavorite(f: Favorite): boolean {
    this.favorites = [
      ...this.favorites,
      { cityKey: f.cityKey, name: f.name, lastKnownTemp: f.lastKnownTemp, weatherText: f.weatherText }
    ];
    return this.checkFavorite(f.cityKey);
  }

//used to remove from favorite list
  removeFavorite(key: string): boolean {
    this.favorites = this.favorites.filter(favorite => favorite.cityKey !== key);
    localStorage.removeItem(key);
    return this.checkFavorite(key);
  }

//used to check if the city selected is favorited before
  checkFavorite(key: string) {
    return this.favorites.filter(f => f.cityKey == key).length > 0 ? true : false
  }

//use to store favorite list in DOM
  addToStorage() {
    let data = localStorage.getItem(this.storageKey);
    if (data) {
      localStorage.removeItem(this.storageKey);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
  }

//used to get city from favorite list by keyLocation
  getFavorite(cityKey: string): Favorite {
    return this.favorites.find(f => f.cityKey == cityKey);
  }
}
