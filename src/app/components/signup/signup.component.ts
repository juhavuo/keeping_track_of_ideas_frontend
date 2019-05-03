import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { BackendConnectorService } from '../../services/backend-connector.service';
import { Router } from '@angular/router';

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
  password_second: string = '';
  error_message: string = '';
  show_error_div: boolean = false;


  constructor(private backendConnectorService: BackendConnectorService, private router: Router) {
    console.log(this.backendConnectorService);
  }

  ngOnInit() {
  }

  register() {
    if(this.user.username.length == 0){
      this.display_error_message('Enter username');
    }

    if (this.password_second == this.user.password) {
      if (this.qualifyPassword(this.user.password)) {
        
        this.backendConnectorService.register(this.user).subscribe(response => {
          console.log(response);
          this.router.navigate(['login']);
        });
      }
    } else {
      this.display_error_message('password and password retype don\'t match');
    }
  }

  public hideErrors() {
    this.show_error_div = false;
    this.error_message = '';
  }

  private qualifyPassword(pword: string) {
    this.hasNumembersAndLetters(pword);
    if (pword.length < 8) {
      this.display_error_message('password must be 8 characters long');
      return false;
    }else if(!this.hasNumembersAndLetters(pword)){
      this.display_error_message('password must have both numbers and letters');
      return false;
    }else {
      return true;
    }
  }

  private display_error_message(em: string){
    this.show_error_div = true;
    this.error_message = em;
  }

  private hasNumembersAndLetters(em: string){
    const numberPattern = /[0-9]/g;
    const letterPattern = /[A-Z|a-z|ä|Ä|ö|Ö|å|Å]/g;

    const matchesNumbers = em.match(numberPattern);
    const matchesLetters = em.match(letterPattern);

    if(matchesNumbers != null && matchesLetters != null){
      return true;
    }else{
      return false;
    }
  }

}
