import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { WeatherForecastComponent } from '../../weather-forecast/weather-forecast.component';
import { WindEnergyComponent } from '../../windEnergy/windEnergy.component';
import {WindPowerPlantComponent} from '../../windEnergy/windPowerPlant/windPowerPlant.component' ;

import { SolarEnergyComponent } from '../../solarEnergy/solarEnergy.component';
import {SolarPowerPlantComponent} from '../../solarEnergy/solarPowerPlant/solarPowerPlant.component' ;
import { TodaysWeatherComponent } from '../../todaysWeather/todaysWeather.component';
import { PowerBalanceComponent } from 'app/power-balance/power-balance.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'todays-weather',      component: TodaysWeatherComponent },
    { path: 'weather-Forecast',   component: WeatherForecastComponent },
    { path: 'solarEnergy',  component: SolarEnergyComponent },
    { path: 'solarEnergy/solarPowerPlant/:id',  component: SolarPowerPlantComponent },
    { path: 'windEnergy',  component: WindEnergyComponent },
    { path: 'windEnergy/windPowerPlant/:id',  component: WindPowerPlantComponent },
     { path: 'powerSupplyBalance',  component: PowerBalanceComponent },
];

