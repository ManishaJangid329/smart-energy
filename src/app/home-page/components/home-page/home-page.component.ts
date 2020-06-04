import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../../../services/prediction.service'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private predictionService : PredictionService) { }

  ngOnInit(): void {

    this.predictionService.initAPI().subscribe((resp)=>{
      console.log("api called")
    },(err)=>{
      console.log("error")
    })
  }

}
