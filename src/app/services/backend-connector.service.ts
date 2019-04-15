import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  username: string;
  password: string;

  usersUrl = "https://localhost:3000/users";
  ideasUrl = "https://localhost:3000/ideas";



  constructor(private http: HttpClient){}

  public login(){
    const body = {
      username: this.username,
      password: this.password
    };

    const settings = {
       headers: new HttpHeaders().set('Content-Type', 'application/json')
     };

    console.log("username: " + this.username + ", password: " + this.password);

    this.http.post(this.usersUrl+'/login', body, settings).subscribe(response =>{
      console.log(response);
    });
  }

}
