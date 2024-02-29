import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PanelService } from './panel.service';
import { SigninComponent } from './signin/signin.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';
// import { HubConnection } from '@microsoft/signalr';
import { MatSnackBarModule,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SigninComponent,
    ChatHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule, BrowserAnimationsModule,MatSnackBarModule
    
  ],
  providers: [PanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
