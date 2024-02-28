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
import { HubConnection } from '@microsoft/signalr';
import { MatSnackBarModule,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FfComponent } from './ff/ff.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SigninComponent,
    ChatHomeComponent,
    FfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule,MatSnackBarModule, BrowserAnimationsModule,
    
  ],
  providers: [PanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
