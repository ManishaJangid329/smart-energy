import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
//import { HttpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { WindEnergyComponent } from './windEnergy/windEnergy.component';

import { SolarEnergyComponent } from './solarEnergy/solarEnergy.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    /*HttpModule,*/
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqT8fgkm62aVC86O2GokS3IKzCGNVmWYk'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
