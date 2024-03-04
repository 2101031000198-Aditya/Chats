import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  isSignUppanel: boolean = false;
  errorMessage: string = '';


  name: string = '';
  username: string = '';
  password: string = '';
  location: string = '';

  // Define horizontal and vertical positions for the snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar, private auth2Service: AuthService, private router: Router, private authService: AuthenticationService, private sharedService: SharedService) { }

  registeron() {
    this.isSignUppanel = true;

  }
  registeroff() {
    this.isSignUppanel = false;

  }

  signUp() {
    if (!this.username || !this.password || !this.name || !Location) {
      alert("Please fill All the Fields")

      return;
    }

    const userData = {
      Name: this.name,
      Username: this.username,
      Password: this.password,
      Location: this.sharedService.coordinates.lat + ',' + this.sharedService.coordinates.lon,
      // this.sharedService.Username= this.username 
    };
    this.sharedService.width = 200; // Set your desired width
    this.sharedService.height = 200; // Set your desired height'
    this.sharedService.Username = this.username;

    this.authService.signUp(userData).subscribe(
      (response) => {
        console.log('Sign up successful:', response);

        this.router.navigate(['/image-control']);
        // console.log('Stored coordinates from shared service:', this.sharedService.coordinates);
      },
      (error) => {
        console.error('Error signing up:', error);
      }
    );
  }
FakeSignUp(){
  this.router.navigate(['/image-control']);
}
  // signIn() {
  //   this.sharedService.Username = this.username;
  //   const userData = {
  //     Username: this.username,
  //     Password: this.password,
  //   };

  //   this.authService.signIn(userData).subscribe(
  //     (response) => {
  //       console.log('Sign in successful:', response);
  //       console.log('Username:', this.sharedService.Username);
  //       this.router.navigate(['/chat-home']);

  //     },
  //     (error) => {
  //       console.error('Error signing in:', error);
  //     }
  //   );
  // }

  signIn() {
    if (!this.username || !this.password) {
      alert("Please fill username and password")
      return;
    }
    this.sharedService.Username = this.username;
    const userData = {
      Username: this.username,
      Password: this.password,
    };
    if (this.auth2Service.signIn(this.username, this.password)) {

      if (!this.username || !this.password) {
        this.errorMessage = 'Email and password are required.';
        return;
      }

      this.authService.signIn(this.username)
        .subscribe((response: any) => {

          if (!response || !response.Password || response.Password !== this.password) {
            this.errorMessage = 'Invalid email or password.';

            return;
          }
          else {
            this.router.navigate(['/chat-home']);
          }

        }, error => {
          console.error('Error occurred during login:', error);
          this.errorMessage = 'An error occurred during login.';
        });
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}