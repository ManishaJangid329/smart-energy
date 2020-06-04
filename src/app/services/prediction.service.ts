import { Injectable,Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment' ;

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  
  baseUrl = environment.baseUrl; 
  constructor(@Inject(HttpClient) private http: HttpClient) { }

initAPI() {
  return this.http.get(this.baseUrl+ 'SmartEnergy/init') ;
}

weatherSolarAPI(){
  return this.http.get(this.baseUrl+ 'SmartEnergy/weather-forecast-solar') ;
}

weatherWindAPI(){
  return this.http.get(this.baseUrl+ 'SmartEnergy/weather-forecast-wind') ;
}

onPredictEnergyAPI(type) {
  return this.http.get(this.baseUrl+ 'SmartEnergy/predict/'+type) ;  
}



}
