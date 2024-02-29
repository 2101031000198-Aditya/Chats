import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://192.168.1.20/api/Users';
  constructor(private http: HttpClient) {}

  updatePhoto(username: string, base64data: string): Observable<any> {
    const user = { ProfileImage: base64data }; // Create a user object with the profile image
    return this.http.put(`${this.url}/${username}`, user);
  }
  
}