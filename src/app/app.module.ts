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
import { ImageControlComponent } from './image-control/image-control.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import{ImageCropperModule} from 'ngx-image-cropper';
import{MatButtonModule} from '@angular/material/button';
import{MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SigninComponent,
    ChatHomeComponent,
    ImageControlComponent,
    ImageCropComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule, BrowserAnimationsModule,MatSnackBarModule
    ,ImageCropperModule,MatButtonModule,MatDialogModule
    
  ],
  providers: [PanelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
