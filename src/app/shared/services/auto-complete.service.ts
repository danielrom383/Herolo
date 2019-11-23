import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AutoCompleteResult } from '../../models/auto-complete/AutoCompleteResult';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private myHttpClient: HttpClient) {
  }

 public  getAutoComplete(searchInput:string) {
   return this.myHttpClient.get<AutoCompleteResult>(`${environment.apiUrl}/locations/v1/cities/autocomplete?apikey=${environment.apiKey}&q=${searchInput}`);
 }
}