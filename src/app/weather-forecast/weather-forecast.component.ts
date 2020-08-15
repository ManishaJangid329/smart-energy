import { Component, OnInit } from '@angular/core';
import { CurrentWeatherService } from '../services/currentWeather.service'
import * as Chartist from 'chartist';

@Component({
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.css'],
    providers: [CurrentWeatherService]
})
export class WeatherForecastComponent implements OnInit {
    myClass: string;

    constructor(private currentWeatherService: CurrentWeatherService) { }
    WeeklyWeatherData;
    imageIcon;
    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
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
    minTemperatureArray: string[]
    maxTemperatureArray: string[]
    timeArray: string[]

    getImageIcon(description) {
        if (description.includes('showers')) {
            return 'icon-14';
        }
        else if (description.includes('thunderstorm')) return 'icon-12';
        else if (description.includes('rainy')) return 'icon-14';
        else if (description.includes('cloudy')) return 'icon-5';
        else if (description.includes('Mostly sunny')) return 'icon-1';
        else if (description.includes('sun')) return 'icon-1';
        else return 'icon-5';
    }

    ngOnInit() {


        this.imageIcon = {
            'A few clouds': 'icon-5',
            'Plenty of sun': 'icon-1',
            'Mostly sunny': 'icon-1',
            'More sun than clouds': 'icon-3',
            'rainy': 'icon-14',
            'thunderstorm': 'icon-12'
        }




        this.minTemperatureArray = []
        this.maxTemperatureArray = []
        this.timeArray = []

        this.currentWeatherService.getWeeklyData()
            .subscribe((response) => {

                this.WeeklyWeatherData = response;

                console.log("weather data", this.WeeklyWeatherData)
                this.WeeklyWeatherData.forEach(obj => {
                    var myDate = obj.date.split(" ");
                    this.timeArray.push(myDate[0]);

                    var minTemp = obj.minTemperature.split(" ")
                    this.minTemperatureArray.push(minTemp[0])

                    var maxTemp = obj.maxTemperature.split(" ")
                    this.maxTemperatureArray.push(maxTemp[0])

                })
                // var value = [this.minTemperatureArray,this.maxTemperatureArray]
                this.onGraphLoadFirst(this.timeArray, this.minTemperatureArray, this.maxTemperatureArray, 60, 100)
            })
    }


    onGraphLoadFirst(label, Minvalue, Maxvalue, min, max) {

        // console.log("label",label)
        // console.log("value",value)
        const dataChart: any = {
            labels: label,
            series: [Minvalue, Maxvalue]
        };
        console.log("label", dataChart.labels)
        console.log("value", dataChart.series)


        const optionsChart: any = {

            lineSmooth: Chartist.Interpolation.cardinal({ tension: 10 }), low: min, high: max,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            height: "250px"
        }

        var Chart = new Chartist.Line("#Temperature", dataChart, optionsChart);
        this.startAnimationForLineChart(Chart);

    }

    changeGraph(type) {
        if (type == 'min') {
            this.onGraphLoadFirst(this.timeArray, this.minTemperatureArray, [], 60, 100)
        }
        else if (type == "max") {
            this.onGraphLoadFirst(this.timeArray, [], this.maxTemperatureArray, 60, 100)
        }
        else if (type == "both") {
            this.onGraphLoadFirst(this.timeArray, this.minTemperatureArray, this.maxTemperatureArray, 60, 100)

        }
    }

}
