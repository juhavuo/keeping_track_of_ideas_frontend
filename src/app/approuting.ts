import { RouterModule, Routes} from '@angular/router';
import { NgModule} from '@angular/core'

import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { IdeasviewComponent } from './components/ideasview/ideasview.component';
import { AddideaComponent} from './components/addidea/addidea.component';
import { PublicideasComponent} from './components/publicideas/publicideas.component';
import { EditideaComponent } from './components/editidea/editidea.component';

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
  },
  {
    path: 'publicideas',
    component: PublicideasComponent
  },
  {
    path: 'editidea',
    component: EditideaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class Approuting {}
