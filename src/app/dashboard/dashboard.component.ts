import { Component, OnInit } from '@angular/core';
import {PredictionService} from '../services/prediction.service' ;
import * as Chartist from 'chartist';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe,PredictionService]
})
export class DashboardComponent implements OnInit {
  currDate: string
  date = new Date(); 
  EnergyRequiredLabel

  constructor(private datePipe: DatePipe,private predictionService : PredictionService) 
  {
    this.currDate = this.datePipe.transform(this.date, 'dd-MMM-yyyy');
   }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  
  ngOnInit() {
     
      this.callingWeatherForecastAPI()  ;
     
  }
  


  callingWeatherForecastAPI() {
  //this should be called before calling prediction model 
  this.predictionService.weatherSolarAPI()
  .subscribe((response)=> {
    this.onCallPredictEnergy("solar") 
  })
  this.predictionService.weatherWindAPI()
  .subscribe((response)=> {
    this.onCallPredictEnergy("wind") 
  })
   
  
  }

  onCallPredictEnergy(type) 
  {   
    this.predictionService.onPredictEnergyAPI(type)
    .subscribe((response)=>{
      console.log(response)
      if(type=="solar") {
        this.onGraphLoad(response,"#SolarEnergy") ;
        this.onGraphLoadFirst("#TotalEnergyReq") 
      }
      else if(type=="wind"){
        this.onGraphLoad(response,"#WindEnergy") ;
      }
    })

  }

  onGraphLoad (response ,GraphDivId) 
  { 
    
    this.EnergyRequiredLabel = response.hour ;
    const dataChart: any = {
      labels:response.hour ,
      series: [response.value]
    };
    let optionsChart: any = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 10}), low: 0,high: 600, 
    chartPadding: { top: 0, right: 0, bottom: 0, left: 10},}
   
    if(GraphDivId=="#WindEnergy") {
       optionsChart = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 10}), low: 0,high: 25, 
      chartPadding: { top: 0, right: 0, bottom: 0, left: 20},}
  
    }
    


    

    var Chart = new Chartist.Line(GraphDivId, dataChart, optionsChart);
    this.startAnimationForLineChart(Chart);


} 

onGraphLoadFirst(GraphDivId) {

  const dataChart: any = {
    labels: this.EnergyRequiredLabel,
    series: [
      [100,200,250,270,280,300,400,450,380,320,280,270,150,100,50,0,0,0,0,0,0,0,0,0]
    ]
  };
  const optionsChart: any = { lineSmooth: Chartist.Interpolation.cardinal({ tension: 10}), low: 0,high: 600, 
    chartPadding: { top: 0, right: 0, bottom: 0, left: 10},}

    var Chart = new Chartist.Line(GraphDivId, dataChart, optionsChart);
    this.startAnimationForLineChart(Chart);

}


}
