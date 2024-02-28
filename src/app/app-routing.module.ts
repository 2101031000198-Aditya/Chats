import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'chat-home', component: ChatHomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

