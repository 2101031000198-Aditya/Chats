import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';
import { ImageControlComponent } from './image-control/image-control.component';
import { ImageCropComponent } from './image-crop/image-crop.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'chat-home', component: ChatHomeComponent, canActivate: [AuthGuard] },
  { path: 'image-control', component:ImageControlComponent },
  { path:'image-control', component:ImageCropComponent},
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

