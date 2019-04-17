import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BackendConnectorService } from '../../services/backend-connector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User = {
    username: '',
    password: ''
  };


  constructor(private backendConnectorService: BackendConnectorService) {
    console.log(this.backendConnectorService);
  }

  ngOnInit() {
  }

  register(){
    this.backendConnectorService.register(this.user).subscribe(response =>{
      console.log(response);
    });
  }

}
