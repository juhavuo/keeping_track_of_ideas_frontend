import { Component, OnInit } from '@angular/core';
import {BackendConnectorService} from '../../services/backend-connector.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public backendConnectorService: BackendConnectorService) { }

  ngOnInit() {
  }

}
