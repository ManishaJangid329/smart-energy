import { Routes } from '@angular/router';
import {HomePageComponent} from './components/home-page/home-page.component'
import {HomeDetailsComponent} from './components/home-details/home-details.component'
import {AboutUsComponent} from './components/about-us/about-us.component'
import {ContactUsComponent} from './components/contact-us/contact-us.component'
import {LoginComponent} from  './components/login/login.component'
 export const HomePageRoutes: Routes = [
    
    { path: 'login',      component: LoginComponent },
    { path: 'homePage',      component: AboutUsComponent  },
    { path: 'about-us',   component: HomeDetailsComponent },
    { path: 'contact-us',     component: ContactUsComponent },
    
];

