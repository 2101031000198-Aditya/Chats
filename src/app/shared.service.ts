import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // sharedProperty: string = '';
  width: number = 200;
  height: number = 200;
  coordinates: { lat: number, lon: number } = { lat: 0, lon: 0 };
  Username: string = '';

  constructor() { }


}
