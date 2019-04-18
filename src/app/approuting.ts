import { RouterModule, Routes} from '@angular/router';
import { NgModule} from '@angular/core'

import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { IdeasviewComponent } from './components/ideasview/ideasview.component';
import { AddideaComponent} from './components/addidea/addidea.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'ideasview',
    component: IdeasviewComponent
  },
  {
    path: 'addidea',
    component: AddideaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class Approuting {}
