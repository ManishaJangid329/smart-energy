import { Component, AfterViewInit,OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-solarEnergy',
  templateUrl: './solarEnergy.component.html',
  styleUrls: ['./solarEnergy.component.css']
})
export class SolarEnergyComponent implements OnInit {

   
  solarPowerPlant
  
  constructor() { }
//   showNotification(from, align){
//       const type = ['','info','success','warning','danger'];

//       const color = Math.floor((Math.random() * 4) + 1);

//       $.notify({
//           icon: "notifications",
//           message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

//       },{
//           type: type[color],
//           timer: 4000,
//           placement: {
//               from: from,
//               align: align
//           }
//       });
//   }
  ngOnInit() 
  {

    this.solarPowerPlant =[
      { 
        id : 0 ,
        name:'Pavagada Solar Park', 
        location:' Palavalli, Karnataka' ,
        area : " 13,000 acres",
        capacity:"2,050 MegaWatt"
      },
      { 
        id : 1 ,
         name:'ADANI SOLAR PLANT', 
        location:' Kolar, Karnataka' ,
        area : "2500 Acree ",
        capacity:" 648 MegaWatt "
      },
      { id : 2 ,
        name:'Karnataka I Project ', 
        location:'Koppal,Karnataka ' ,
        area : " 178 acres",
        capacity:" 40.5 MegaWatt"
      },
      { id : 3 ,
        name:'Solar power plant', 
        location:'Ramanagara, Karnataka' ,
        area : "92 Acres (approx.)",
        capacity:"20 MegaWatt"
      },
      { id :4 ,
        name:'Bosch Power plant ', 
        location:' Chamarajanagar, Karnataka' ,
        area : "1.5 Acres (approx)",
        capacity:"100 KilloWatt"
      },

     ] ;

  } 

  title = 'angular-gmap';
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 14.138323;
    lng = 77.314646;
    markers = [
        {
            position: new google.maps.LatLng(14.138323, 77.314646),
            map: this.map,
            title: "Pavagada Solar Park"
          },
          {
            position: new google.maps.LatLng(12.876852, 78.038313),
            map: this.map,
            title: "Adani Solar Park"
          },
          {
            position: new google.maps.LatLng(15.552897, 76.431802),
            map: this.map,
            title: "Karnataka I Project"
          },
          {
            position: new google.maps.LatLng(12.607107, 77.424753),
            map: this.map,
            title: "Solar power plant Ramanagara"
          },
          {
            position: new google.maps.LatLng(11.965167, 76.806878),
            map: this.map,
            title: "Bosch Power plant"
          }
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
