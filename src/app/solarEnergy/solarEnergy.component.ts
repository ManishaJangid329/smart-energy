import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
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
 
    ngOnInit() {
        // var een = '12.967938';
        // var twee = '77.711434';
        this.solarPowerPlant = [
            {
                id: 0,
                name: 'Pavagada Solar Park',
                location: ' Palavalli, Karnataka',
                area: " 13,000 acres",
                capacity: "2,050 MegaWatt"
            },
            {
                id: 1,
                name: 'ADANI SOLAR PLANT',
                location: ' Kolar, Karnataka',
                area: "2500 Acree ",
                capacity: " 648 MegaWatt "
            },
            {
                id: 2,
                name: 'Karnataka I Project ',
                location: 'Koppal,Karnataka ',
                area: " 178 acres",
                capacity: " 40.5 MegaWatt"
            },
            {
                id: 3,
                name: 'Solar power plant',
                location: 'Ramanagara, Karnataka',
                area: "92 Acres (approx.)",
                capacity: "20 MegaWatt"
            },
            {
                id: 4,
                name: 'Bosch Power plant ',
                location: ' Chamarajanagar, Karnataka',
                area: "1.5 Acres (approx)",
                capacity: "100 KilloWatt"
            },
           

        ];
        this.getDistanceInMap();
    }

    getDistanceInMap() {
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(this.mapOptions);
        directionsDisplay.setPanel(document.getElementById('panel'));
        // var een = '12.967938';
        // var twee = '77.711434';
        // var lat = '14.138323';
        // var lng = '77.314646';

        var een = '52.3641205';
        var twee = '4.905697000000032';
        var drie = '52.6010666';
        var vier = '4.73768229999996';
        var p1 = new google.maps.LatLng(een, twee);
        var p2 = new google.maps.LatLng(drie, vier);

        var request = {
            origin: p1,
            destination: p2,
            travelMode: google.maps.DirectionsTravelMode.DRIVING,
            unit: google.maps.UnitSystem.METRIC
        };

        directionsService.route(request, function (response, status) {
            console.log('manisha' + response)
            if (status == google.maps.DirectionsStatus.OK) {
                alert('Total travel distance is:' + response.routes[0].legs[0].distance.text);
                console.log('Total travel distance is:' + response.routes[0].legs[0].distance.text)
                this.directionsDisplay.setDirections(response);

            }
        });


    }

    title = 'angular-gmap';
    @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
    map: google.maps.Map;
    lat = 14.138323;
    lng = 77.314646;
    pinColor = "ffff00";
    pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + this.pinColor,
        new google.maps.Size(91, 74),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
   

    markers = [
        {
            position: new google.maps.LatLng(12.967938, 77.711434),
            map: this.map,
            title: "CMRIT College",
             icon: this.pinImage,
        },
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
        zoom: 7,
        // mapTypeId: google.maps.MapTypeId.HYBRID
        mapTypeId: google.maps.MapTypeId.ROADMAP
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
