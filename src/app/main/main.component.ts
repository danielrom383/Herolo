import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DailyForecastService } from 'src/app/shared/services/daily-forecast.service';
import { AutoCompleteService } from 'src/app/shared/services/auto-complete.service';
import { AutoCompleteResult } from 'src/app/models/auto-complete/AutoCompleteResult';
import { AdministrativeArea } from 'src/app/models/auto-complete/AdministrativeArea';
import { Favorite } from 'src/app/models/favorite';
import { ActivatedRoute } from '@angular/router';
import { FavoritesStoreService } from 'src/app/shared/services/favorite-store.service';
import { DailyForecast } from 'src/app/models/forecast/daily-forecast';
import { FiveDaysForecast } from 'src/app/models/forecast/five-days-forecast';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  selectedCity: AutoCompleteResult;
  cityKey: string;
  isFavorite: boolean;
  DEFAULT_CITY = ('tel aviv');
  isCityClicked:boolean =false;
  autoCompleteResult:AutoCompleteResult;
  searchInput:string;
  multipleForecasts:FiveDaysForecast;
  primaryForecast:DailyForecast;

  constructor(private myDailyForecastService:DailyForecastService, private myAutoCompleteService:AutoCompleteService,public favoritesStore: FavoritesStoreService, private route: ActivatedRoute) {}

//get the default city that choosen upper by the variable "DEFAULT_CITY"
  public getDefaultCity() {
    this.myAutoCompleteService.getAutoComplete(this.DEFAULT_CITY).subscribe(res => {
      this.selectedCity = res[0];
      this.isFavorite = this.favoritesStore.checkFavorite(this.selectedCity.Key);
      this.getCityData();
    });
  }

//get current weather and 5 days forecast and check if this city is listed in favorite
  getCityData() {
    let cityKey = this.selectedCity.Key;
    this.isFavorite = this.favoritesStore.checkFavorite(cityKey);
    this.getSingleDayForecast(+cityKey);
    this.getMultipleDailyForecast("5day",cityKey);
  }
  
//get currrent weather
  getSingleDayForecast(locationKey:number) {
   const observable = this.myDailyForecastService.getDailyForecast("1day", locationKey);
   observable.subscribe(
     res => {
       this.primaryForecast = res.DailyForecasts[0]
   },
   err=>{
     console.log(err)
   }
 )
 }

//get 5 days forecast
  getMultipleDailyForecast(days:string, locationKey:string) {
    const observable = this.myDailyForecastService.getDailyForecast(days, +locationKey);
    this.isFavorite = this.favoritesStore.checkFavorite(locationKey);
    observable.subscribe(
      res => {
        
        this.multipleForecasts = res;
    },
    err=>{
      console.log(err)
    }
  )
  }

//this function made for getting list of "searchInput" variable
  autoComplete(){
    const observable = this.myAutoCompleteService.getAutoComplete(this.searchInput);
    observable.subscribe(
      res=> {
        this.autoCompleteResult = res;
      console.log(this.autoCompleteResult)
   },
    err=>{
      console.log(err)
  }
)
}

//this function handle all the details of the city selected and checking if not favorited to add
addFavorite() {
  let f: Favorite = {
      cityKey: this.selectedCity.Key,
      lastKnownTemp: this.multipleForecasts.DailyForecasts[0].Temperature.Maximum.Value.toFixed(),
      name: this.selectedCity.LocalizedName,
      weatherText: this.multipleForecasts.Headline.Text
  }
  this.isFavorite = this.favoritesStore.addFavorite(f);
}

//this function handle KeyLocation of the city selected and checking if not favorited to delete
removeFavorite() {
  this.isFavorite = this.favoritesStore.removeFavorite(this.selectedCity.Key);
}

//this function knows what function sould shown in the html
addRemoveFavorite() {
  this.isFavorite ? this.removeFavorite() : this.addFavorite();
}

//this function gives option to move from favorite list to weather component and see the city clicked
routedFromFavorites(): boolean {
  this.route.paramMap.subscribe(params => {
    this.cityKey = params.get('key');
  });
  return this.cityKey ? true : false;
}


retrieveFavoriteDetails() {
  let favorite = this.favoritesStore.getFavorite(this.cityKey);
  this.selectedCity = new AutoCompleteResult();
  this.selectedCity.Key = favorite.cityKey;
  this.selectedCity.LocalizedName = favorite.name;
}


ngOnInit() {
  if (this.routedFromFavorites()) {
    this.retrieveFavoriteDetails();
    this.getCityData()
  } else {
    this.getDefaultCity();
  } 
}
}

