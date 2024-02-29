// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';

export interface Messages {
  SenderUsername: string;
  ReceiverUsername: string;
  MessageText: string;
  
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  getLoggedInUsername(): string {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://192.168.1.20/api/Users/';
  private apiUrlMsg = 'http://192.168.1.20/api/Messages/';
  
  

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  signUp(data: any): Observable<any> {

    return this.http.post(this.apiUrl, data);
  }

  signIn(data: any): Observable<any> {
    const username = this.sharedService.Username; // Get the username from SharedService
    const signInUrl = `${this.apiUrl}get/${username}`; // Construct the URL
    console.log(signInUrl)
    return this.http.get(signInUrl, data); // Use the constructed URL
  }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserReceiverMessages(username: string): Observable<Messages[]> {
    const route = 'receiver';
    return this.http.get<Messages[]>(`${this.apiUrlMsg}/${route}/${username}`);
  }
  
  getUserSenderMessages(username: string): Observable<Messages[]> {
    const route = 'sender';
    return this.http.get<Messages[]>(`${this.apiUrlMsg}/${route}/${username}`);
  }
  
  



  sendMessage(message:Messages): Observable<any> {
   const Msg=`${this.apiUrlMsg}`
    return this.http.post(Msg,message);
  }

}