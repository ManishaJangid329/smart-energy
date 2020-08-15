import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/todays-weather', title: 'Todays Weather',  icon:'cloud_upload', class: '' },
    { path: '/weather-Forecast', title: 'Weather Forecast',  icon:'cloud', class: '' },
    { path: '/solarEnergy', title: 'Solar Energy',  icon:'brightness_5', class: '' },
    { path: '/solarEnergy/solarPowerPlant/0', title: 'Solar Power Plant',  icon:'business', class: '' },
    { path: '/windEnergy', title: 'Wind Energy',  icon:'toys', class: '' },
    { path: '/windEnergy/windPowerPlant/0', title: 'Wind Power Plant',  icon:'business', class: '' },
    // { path: '/powerSupplyBalance', title: 'Power supply Balance',  icon:'flash_on', class: '' },
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
