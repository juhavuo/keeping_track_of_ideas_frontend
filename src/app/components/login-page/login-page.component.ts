import { Component, OnInit } from '@angular/core';
import {BackendConnectorService} from '../../services/backend-connector.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private backendConnectorService: BackendConnectorService, public router: Router) { }

  ngOnInit() {
  }

  goToSignup(){
    this.router.navigate(['signup']);
  }

}
