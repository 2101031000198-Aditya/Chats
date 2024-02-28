import { Injectable } from '@angular/core';
import { HubConnection , HubConnectionBuilder} from '@microsoft/signalr';
import { BehaviorSubject, Subscription , Observable} from 'rxjs';

interface User {
  id: string;
  name: string;
  pictureUrl: string;
  distance: number;
}

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatSignalrService {
  private connection!: HubConnection;
  private availableUsersSubject = new BehaviorSubject<User[]>([]);
  availableUsers$: Observable<User[]> = this.availableUsersSubject.asObservable();

  constructor() {}

  connect() {
    const url = 'your-signalr-hub-url'; // Replace with your actual hub URL
    this.connection = new HubConnectionBuilder().withUrl(url).build();

    this.connection.on('ReceiveAvailableUsers', (users: User[]) => {
      this.availableUsersSubject.next(users);
    });

    return this.connection.start();
  }

  disconnect() {
    this.connection.stop();
  }

  onAvailableUsersReceived(callback: (users: User[]) => void): Subscription {
    return this.availableUsers$.subscribe(callback);
  }

  // Add methods for other functionalities based on your SignalR hub:
  // - Send message to a specific user
  // - Join/leave chat rooms
  // - Handle incoming messages for specific conversations
  // ...
}
