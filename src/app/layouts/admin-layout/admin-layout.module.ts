import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import * as Charts from 'fusioncharts/fusioncharts.charts' ;
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

    FusionChartsModule.fcRoot(FusionCharts, Charts,Widgets, FintTheme);




import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { WeatherForecastComponent } from '../../weather-forecast/weather-forecast.component';
import { WindEnergyComponent } from '../../windEnergy/windEnergy.component';
import { SolarEnergyComponent } from '../../solarEnergy/solarEnergy.component';
import {SolarPowerPlantComponent} from '../../solarEnergy/solarPowerPlant/solarPowerPlant.component' ;
import {WindPowerPlantComponent} from '../../windEnergy/windPowerPlant/windPowerPlant.component';
import { TodaysWeatherComponent } from '../../todaysWeather/todaysWeather.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { PowerBalanceComponent } from '../../power-balance/power-balance.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FusionChartsModule,
    HttpClientModule,
    /*HttpModule*/
  ],
  declarations: [
    DashboardComponent,
    WeatherForecastComponent,
    WindEnergyComponent,
    WindPowerPlantComponent,
    SolarEnergyComponent,
    TodaysWeatherComponent,
    SolarPowerPlantComponent,
    PowerBalanceComponent
  ]
})

export class AdminLayoutModule {}
