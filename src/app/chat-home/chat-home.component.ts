import { Component,OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../shared.service';
import { AuthenticationService } from '../authentication.service';
import { Subscription, interval } from 'rxjs';

interface Message {
  sender: string;
  content: string;
}

interface Person {
  Name: string;
  Username: string;
  ProfileImage: string;
  Location: string;
  Latitude: number;
  Longitude: number;
}

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.scss']
})
export class ChatHomeComponent implements OnInit, OnDestroy {
  myProfileImageUrl: string = '';
  myLocation: number = 0;

  messages: { [key: string]: Message[] } = {};

  Userdata: any = {};
  allUserdata: any = [];


  constructor(private sharedService: SharedService, private authService: AuthenticationService) {
    console.log('Username:', this.sharedService.Username);
    this.myName = this.sharedService.Username;
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser !== null) {
      this.myName = JSON.parse(storedUser);
      console.warn(this.myName, 'admin');
    }

    this.authService.getUsers().subscribe(
      (result: any) => {
        console.warn("users", result);
        this.allUserdata = result;
        this.updateUserLocation();
      },
      (error: any) => {
        console.error("Error fetching users:", error);
      }
    );

    this.authService.signIn(this.myName).subscribe(
      (Signindata: any) => {
        console.warn("sign in data", Signindata);
        this.Userdata = Signindata;
      },
      (error: any) => {
        console.error("Error signing in:", error);
      }
    );
    // this.startMessageInterval();
  }

  updateUserLocation(): void {
    const [lat, lon] = this.Userdata.Location.split(',').map(Number);
    this.Userdata.Latitude = lat;
    this.Userdata.Longitude = lon;

    this.allUserdata.forEach((user: Person) => {
      const [lat, lon] = user.Location.split(',').map(Number);
      user.Latitude = lat;
      user.Longitude = lon;

      const distance = this.calculateDistance(this.Userdata.Latitude, this.Userdata.Longitude, user.Latitude, user.Longitude);
      console.log(`Distance between ${this.Userdata.Name} and ${user.Name}: ${distance} km`);
    });
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  selectUser(Name: string, Username: string) {
    this.selectedName = Name;

    const selectedPerson = this.allUserdata.find((person: { Name: string; }) => person.Name === Name);
    const selectedUser = this.allUserdata.find((person: { Username: string; }) => person.Username === Name);
    this.selectedUsername = Username;

    if (selectedPerson) {
      this.selectedUserPhotoUrl = selectedPerson.ProfileImage;
    }
  }



  newMessage: string = '';
  selectedName: string = '';
  // selectedUsername: string = '';
  selectedUserPhotoUrl: string = '';

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.selectedName !== '') {
      const message: Message = {
        sender: this.myName,
        content: this.newMessage
      };
      if (!this.messages[this.selectedName]) {
        this.messages[this.selectedName] = [];
      }
      this.messages[this.selectedName].push(message);
      this.newMessage = '';
    }
  }

  filteredPersons: Person[] = this.allUserdata.slice();

  filterUsers(event: any) {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      this.filteredPersons = this.allUserdata.slice();
      return;
    }

    this.filteredPersons = this.allUserdata.filter((person: { Name: string; }) =>
      person.Name.toLowerCase().includes(query)
    );
  }


  private intervalSubscription!: Subscription;

  ngOnDestroy(): void {
    // Unsubscribe from the interval when the component is destroyed
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  startMessageInterval(): void {
    // Call getMessage() every second
    this.intervalSubscription = interval(1000).subscribe(() => {
      this.getMessage();
    });
  }

  getMessage(): void {
    this.authService.getUserMessages(this.selectedUsername, 'receiver').subscribe(receiverMessages => {
      console.warn('receiver_mag', this.selectedUsername, ':-', receiverMessages);
    });

    this.authService.getUserMessages(this.myName, 'sender').subscribe(senderMessages => {
      console.warn('sender_mag', this.myName, ':-', senderMessages);
    });
  }
  selectedUsername: string = '';
  myName!: string;
 



}
