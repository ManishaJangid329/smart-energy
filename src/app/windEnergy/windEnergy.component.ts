import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-windEnergy',
  templateUrl: './windEnergy.component.html',
  styleUrls: ['./windEnergy.component.css']
})
export class WindEnergyComponent implements OnInit {
   
  windPowerPlant
  constructor() { }
  showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          }
      });
  }
  ngOnInit() 
  {

    this.windPowerPlant = [
            {
                id: 0,
                lng: 13.917479,
                lat: 76.066269,
                name: 'Acciona Tuppadahalli',
                location: 'Chitradurga, Karnataka',
                capacity: "56.1 MegaWatt",
                image_src: 'pavagada',
            },
            {
                id: 1,
                lng: 15.736414,
                lat: 75.970502,
                name: 'Shah Gajendragarh MMTCL',
                location: ' Gadag, Karnataka',
                capacity: " 15 MegaWatt ",
                image_src: 'adani',
            },
            {
                id: 2,
                lng: 14.172776,
                lat: 76.390727,
                name: 'Jogmatti BSES ',
                location: 'Chitradurga, Karnataka ',
                capacity: " 14 MegaWatt",
                image_src: 'karnataka',
            },
            {
                id: 3,
                lng: 15.736538,
                lat: 75.971575,
                name: 'Shah Gajendragarh',
                location: 'Gadag, Karnataka',
                capacity: "10.8 MegaWatt",
                image_src: 'ramanagara',
            },
        ];

}

SolarDetail(id) {
  console.log("id",id)
}

 title = 'angular-gmap';
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 14.138323;
    lng = 77.314646;
    markers = [
        {
            position: new google.maps.LatLng(13.917479, 76.066269),
            map: this.map,
            title: "Acciona Tuppadahalli Chitradurga, Karnataka"
          },
          {
            position: new google.maps.LatLng(15.736414, 75.970502),
            map: this.map,
            title: "Shah Gajendragarh MMTCL Gadag, Karnataka"
          },
          {
            position: new google.maps.LatLng(14.172776, 76.390727),
            map: this.map,
            title: "Jogmatti BSES Chitradurga, Karnataka"
          },
          {
            position: new google.maps.LatLng(15.736538, 75.971575),
            map: this.map,
            title: "Shah Gajendragarh Gadag, Karnataka"
          },
         
      ];

    coordinates = new google.maps.LatLng(this.lat, this.lng);

    mapOptions: google.maps.MapOptions = {
     center: this.coordinates,
     zoom: 7 ,
     mapTypeId: google.maps.MapTypeId.HYBRID
    };

    marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    });



    ngAfterViewInit() {
      this.mapInitializer();
    } 

    loadAllMarkers(): void {
        this.markers.forEach(markerInfo => {
          //Creating a new marker object
          const marker = new google.maps.Marker({
            ...markerInfo
          });
    
          //creating a new info window with markers info
          const infoWindow = new google.maps.InfoWindow({
            content: marker.getTitle()
          });
    
          //Add click event to open info window on marker
          marker.addListener("click", () => {
            infoWindow.open(marker.getMap(), marker);
          });
    
          //Adding marker to google map
          marker.setMap(this.map);
        });
      }

   mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    //Adding Click event to default marker
    this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    //Adding default marker to map
    this.marker.setMap(this.map);

    //Adding other markers
    this.loadAllMarkers();
  }

}
