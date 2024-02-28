import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: Map;
  searchQuery1!: string;
  searchQuery2!: string;
  searchResults1: any[] = [];
  searchResults2: any[] = [];
  selectedPlace1: any;
  selectedPlace2: any; 
  storedPlaces1: { name: string, lat: number, lon: number }[] = [];
  storedPlaces2: { name: string, lat: number, lon: number }[] = [];
  distance: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
  }

  searchPlace1() {
    if (this.searchQuery1) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery1}`)
        .then(response => response.json())
        .then(data => {
          this.searchResults1 = data;
        })
        .catch(error => {
          console.error('Error searching for place:', error);
        });
    }
  }

  selectPlace1(place: any) {
    this.selectedPlace1 = place;
    // const coordinates1 = [parseFloat(place.lon), parseFloat(place.lat)];
    // this.map.getView().animate({ center: coordinates1, zoom: 10 });
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const coordinates1 = { lat: lat, lon: lon }; 
    this.map.getView().animate({ center: [coordinates1.lon, coordinates1.lat], zoom: 10 });

    this.sharedService.coordinates = coordinates1;

    this.searchQuery1 = place.display_name;


    this.searchResults1 = [];

    // Store the selected coordinates in the shared service
    // this.sharedService.coordinates.lat = parseFloat(place.lat);
    // this.sharedService.coordinates.lon = parseFloat(place.lon);


    this.storedPlaces1.push({
        name: place.display_name,
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon)
    });

    // Calculate distance
    console.log('Stored coordinates 1:', coordinates1);
    this.calculateDistance();
  }
  storeCoordinates1() {

    if (this.selectedPlace1) {
      this.storedPlaces1.push({
        name: this.selectedPlace1.display_name,
        lat: parseFloat(this.selectedPlace1.lat),
        lon: parseFloat(this.selectedPlace1.lon)

      });

      this.calculateDistance();
    }
  }


  searchPlace2() {
    if (this.searchQuery2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.searchQuery2}`)
        .then(response => response.json())
        .then(data => {
          this.searchResults2 = data;
        })
        .catch(error => {
          console.error('Error searching for place:', error);
        });
    }
  }

  selectPlace2(place: any) {
    this.selectedPlace2 = place;
    const coordinates2 = [parseFloat(place.lon), parseFloat(place.lat)];
    this.map.getView().animate({ center: coordinates2, zoom: 10 });

    this.storedPlaces2.push({
      name: place.display_name,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon)
    });
    console.log('Stored coordinates 2:', coordinates2);
    this.calculateDistance();
  }
  storeCoordinates2() {
    if (this.selectedPlace2) {
      this.storedPlaces2.push({
        name: this.selectedPlace2.display_name,
        lat: parseFloat(this.selectedPlace2.lat),
        lon: parseFloat(this.selectedPlace2.lon)
      });

      this.calculateDistance();
    }
  }

  calculateDistance() {
    console.log('Calculating distance...',this.distance);
    if (this.storedPlaces1.length > 0 && this.storedPlaces2.length > 0) {
      const lat1 = this.storedPlaces1[0].lat;
      const lon1 = this.storedPlaces1[0].lon;
      const lat2 = this.storedPlaces2[0].lat;
      const lon2 = this.storedPlaces2[0].lon;
      this.distance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    }
  }

  getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; 
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  getLiveLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const coordinates1 = { lat: latitude, lon: longitude };
          this.sharedService.coordinates = coordinates1;
          
          console.log('Current location',coordinates1)
          // console.log('Current latitude:', latitude);
          // console.log('Current longitude:', longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
