import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {CurrentWeatherService} from '../../app/services/currentWeather.service'
@Component({
  selector: 'app-todaysWeather',
  templateUrl: './todaysWeather.component.html',
  styleUrls: ['./todaysWeather.component.css'] ,
  providers :[CurrentWeatherService]
})
export class TodaysWeatherComponent implements OnInit {
  ylabel
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
  constructor(public weatherService : CurrentWeatherService) { }
  TodaysweatherData ;
  currentWeatherData ;

  myClass 

  tempArray : string[]
  pressureArray :string []
  windSpeedArray :string []
  timeArray : string[]
  imageIcon ;
  ngOnInit() 
  
  {  
    this.imageIcon= {
      'Partly Cloudy' : 'icon-5',
      'Plenty of sun' : 'icon-1' ,
      'Mostly sunny' : 'icon-1' ,
      'More sun than clouds' :'icon-3' ,
      'rainy' :'icon-14' ,
      'thunderstorm' :'icon-12'
    }
    this.timeArray= []
    this.tempArray= []
    this.windSpeedArray= []
    this.pressureArray= [] 
    var response=this.weatherService.tryDemo() ;
    console.log("myresonse",response)
    this.myClass="tempClass" ;
    this.weatherService.getCurrentWeather().subscribe((response)=> 
    {
        this.currentWeatherData=response ;
        this.setTempPressureGaygeValue();
    })
   
      this.weatherService.getTodaysWeather()
      .subscribe(
        (response)=>{
          this.TodaysweatherData=response ;

           this.TodaysweatherData.data.forEach(obj => {
         
                this.timeArray.push(obj.time) ;
                var temp =obj.temperature.split(" ")
                this.tempArray.push(temp[0]) ;

                var wind =obj.windSpeed.split(" ")
                this.windSpeedArray.push(wind[0]) ;

                var p =obj.pressure.split(" ")
                this.pressureArray.push(p[0]) ;
          });
          console.log(this.timeArray)
          this.ylabel = "Temperature (F) "
          this.onGraphLoadFirst(this.timeArray,this.tempArray,70,90,this.ylabel)
        }) ;

      
      


     

    
  }

    setTempPressureGaygeValue() {
           this.data_thermometer = {
          chart: {
            caption: "Today's Temperature",
            subcaption: "°F",
            lowerlimit: "50",
            upperlimit: "120",
            numbersuffix: "°F",
            thmfillcolor: "#008ee4",
            showgaugeborder: "1",
            gaugebordercolor: "#008ee4",
            gaugeborderthickness: "2",
            theme: "candy",
            exportEnabled: 1,
           // bgColor: "#000047,#FFFFFF",
           
          },
          value:this.currentWeatherData.temperature
        };
        this.TheromometerDataSource = this.data_thermometer;
    
        
        this.data_pressureGauge = {
          chart: {
        
              "showhovereffect": "1" ,
        
            caption: "Today's Wind Speed",
            subcaption: "Kmph",
            captionpadding: "0",
            origw: "320",
            origh: "300",
            gaugeouterradius: "115",
            gaugestartangle: "270",
            gaugeendangle: "-25",
            showvalue: "1",
            valuefontsize: "30",
            majortmnumber: "13",
            majortmthickness: "2",
            majortmheight: "13",
            minortmheight: "7",
            minortmthickness: "1",
            minortmnumber: "1",
            showgaugeborder: "0",
            theme: "candy" ,
            //bgColor: "#000047,#FFFFFF",
          },
          colorrange: {
            color: [
              {
                minvalue: "0",
                maxvalue: "20",
                code: "#999999"
              },
              {
                minvalue: "20",
                maxvalue: "50",
                code: "#F6F6F6"
              }
            ]
          },
          dials: {
            dial: [
              {
                value: this.currentWeatherData.pressure,
                bgcolor: "#F20F2F",
                basewidth: "8"
              }
            ]
          },
          annotations: {
            groups: [
              {
                items: [
                  {
                    type: "text",
                    id: "text",
                    text: "Kmph",
                    x: "$gaugeCenterX",
                    y: "$gaugeCenterY + 40",
                    fontsize: "20",
                    color: "#555555"
                  }
                ]
              }
            ]
          }
        } ;
        this.PressureGaugeDataSource=this.data_pressureGauge ;
      

    }
  
  data_thermometer ;
  TheromometerDataSource ;
  TheromometerWidth = 450;
  TheromometerHeight = 350;
  TheromometerType = "thermometer";
  TheromometerDataFormat = "json";

  width = 450;
  height = 350;
  type = "angulargauge";
  dataFormat = "json";
  PressureGaugeDataSource ;
  data_pressureGauge ;


  
  onGraphLoadFirst(label,value,min,max,yaxisLabel) {

    const dataChart: any = {
      labels:  label,
      series: [value]
    };
   console.log("label",dataChart.labels)
   console.log("value",dataChart.series)
  

    const optionsChart: any = {
      
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 10}), low: min,high:max , 
      chartPadding: { top: 0, right: 0, bottom: 0, left: 20},
       height :"300px" ,
      //  plugins: [
      //   Chartist.plugins.ctAxisTitle({
      //     axisX: {
      //       axisTitle: 'Time (Hours)',
      //       axisClass: 'ct-axis-title',
            
            
      //     },
      //     axisY: {
      //       axisTitle:yaxisLabel ,
      //       axisClass: 'ct-axis-title',
           
      //       flipTitle: false
      //     }
      //   })
      // ]
    }
  
     var Chart = new Chartist.Line("#Temperature", dataChart, optionsChart);
    
     this.startAnimationForLineChart(Chart);
    
  }
  

  changeGraph(type) {
    if(type=='temp') 
    {
        this.onGraphLoadFirst(this.timeArray,this.tempArray,40,100,this.ylabel)
        this.myClass="tempClass" ;
        this.ylabel ="Temperature (F) "
    }
    else if (type=="wind"){
      this.onGraphLoadFirst(this.timeArray,this.windSpeedArray,0,50,this.ylabel)
      this.myClass="windClass"
      this.ylabel ="Wind speed (Mph) "
    }
    else if(type=="pressure"){
      this.onGraphLoadFirst(this.timeArray,this.pressureArray,20,60,this.ylabel)
      this.myClass="pressureClass" 
      this.ylabel ="Pressure (Pa) "
      
    }
  }
  

  
}
