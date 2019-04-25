import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { BackendConnectorService} from './services/backend-connector.service';
import { Approuting} from './approuting';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { IdeasviewComponent } from './components/ideasview/ideasview.component';
import { AddideaComponent } from './components/addidea/addidea.component';
import { PublicideasComponent } from './components/publicideas/publicideas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupComponent,
    IdeasviewComponent,
    AddideaComponent,
    PublicideasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Approuting
  ],
  providers: [BackendConnectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
