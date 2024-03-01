import { Component,OnInit, OnDestroy, AfterViewChecked ,ViewChild, ElementRef} from '@angular/core';
import { SharedService } from '../shared.service';
import { AuthenticationService, Messages } from '../authentication.service';
import { Subscription, interval } from 'rxjs';

interface Message {
SenderUsername: any;
  SentTime: string | number | Date;
  MessageText: any;
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
export class ChatHomeComponent implements OnInit, OnDestroy,AfterViewChecked { 
  myProfileImageUrl: string = '';
  myLocation: number = 0;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;


  messages: { [key: string]: Message[] } = {};

  Userdata: any = {};
  allUserdata: any = [];
  myName: string;
 
  // receiverMessages: Messages[];


  constructor(private sharedService: SharedService, private authService: AuthenticationService) {
    // console.log('Username:', this.sharedService.Username);
    this.myName = this.sharedService.Username;
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  ngOnInit(): void {
    
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
    
    this.receiverSubscription = interval(4000).subscribe(() => {
      this.Receivermsg();
      // this.Sendermsg();
    });
   this.Sendermsg();
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
      // console.log(`Distance between ${this.Userdata.Name} and ${user.Name}: ${distance} km`);
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
    // console.warn('selectedUsername',this.selectedUsername);
    // console.warn(this.myName,'adminname');
    

    if (selectedPerson) {
      this.selectedUserPhotoUrl = selectedPerson.ProfileImage;
    }
  }



  newMessage: string = '';
  selectedName: string = '';
  selectedUsername: string = '';
  selectedUserPhotoUrl: string = '';


  filteredPersons: Person[] = this.allUserdata.slice();

  filterUsers(event: any) {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      this.filteredPersons = this.allUserdata.slice(); // Display all profiles when search query is empty
      return;
    }
  
    const queryWords = query.split(' ');
    this.filteredPersons = this.allUserdata.filter((person: Person) => {
      for (let word of queryWords) {
        if (!person.Name.toLowerCase().includes(word)) {
          return false; // If any word doesn't match, exclude this person
        }
      }
      return true; // Include this person if all words match
    });
  }
  
  receiverMessages:any;
  senderMessages:any;
  private receiverSubscription: Subscription | undefined;

  ngOnDestroy(): void {
    // Unsubscribe from interval when component is destroyed
    if (this.receiverSubscription) {
      this.receiverSubscription.unsubscribe();
    }
  }

  Receivermsg() {
    this.authService.getMessagesBySender(this.selectedUsername,this.myName)
      .subscribe(
        (messages) => {
          this.receiverMessages = messages;
          this.combineAndSortMessages();
          // console.log('receiver',messages);
        },
        (error) => {
          // Handle error here
          console.error('Error occurred:', error);
        }
      );
  }

  Sendermsg() {
    this.authService.getMessagesBySender(this.myName,this.selectedUsername)
      .subscribe(
        (messages) => {
          // Handle received messages here 
          this.senderMessages = messages;
          this.combineAndSortMessages();
          // console.log('sender',messages);
        },
        (error) => {
          // Handle error here
          console.error('Error occurred:', error);
        }
      );
  }
 
  Messagestored: Message[]=[];
  combineAndSortMessages() {
    if (this.senderMessages && this.receiverMessages) {
      const allMessages: Message[] = [...this.senderMessages, ...this.receiverMessages];
      allMessages.sort((a, b) => new Date(a.SentTime).getTime() - new Date(b.SentTime).getTime());
      this.Messagestored = allMessages;
      // console.log('Sorted Messages:', this.Messagestored);
      // Now you can use this.messages to display messages in ascending order of time
    }
  }
  
  
  Messagestore: string = '';
  
  sendMessage() {
    const message: Messages = {
      SenderUsername: this.myName,
      ReceiverUsername: this.selectedUsername,
      MessageText: this.Messagestore
    };
  
    this.authService.sendMessage(message).subscribe(
      response => {
        // console.log('Message sent successfully:', response);
        // Clear the input field
        this.Messagestore = '';
        // Delay retrieval for 500 milliseconds (adjust as needed)
        setTimeout(() => {
          this.Sendermsg();
        }, 100);
      },
      error => {
        console.error('Error sending message:', error);
      }
    );
  }
  
  
  
  
}
