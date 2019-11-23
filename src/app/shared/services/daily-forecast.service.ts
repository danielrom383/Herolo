import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FiveDaysForecast } from '../../models/forecast/five-days-forecast';

@Injectable({
  providedIn: 'root'
})

export class DailyForecastService {

  constructor(private myHttpClient: HttpClient) {
   }
//get forecase (made the function flexible for future changes "${days}")
  public getDailyForecast(days:string, locationKey:number) {
    return this.myHttpClient.get<FiveDaysForecast>(`${environment.apiUrl}/forecasts/v1/daily/${days}/${locationKey}?apikey=${environment.apiKey}&metric=true`);
  }

}