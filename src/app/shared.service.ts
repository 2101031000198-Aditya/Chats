import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // sharedProperty: string = '';
  coordinates: { lat: number, lon: number } = { lat: 0, lon: 0 };
  Username: string = '';

  constructor() { }


}
