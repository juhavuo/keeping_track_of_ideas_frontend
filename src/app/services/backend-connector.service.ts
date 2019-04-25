import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  username: string;
  password: string;

  usersUrl = "https://localhost:3000/users";
  ideasUrl = "https://localhost:3000/ideas";

  settings = {
     headers: new HttpHeaders().set('Content-Type', 'application/json')
   };

  constructor(private http: HttpClient, private router: Router){}

  public login(){
    const body = {
      username: this.username,
      password: this.password
    };

    console.log("username: " + this.username + ", password: " + this.password);

    this.http.post(this.usersUrl+'/login', body, this.settings).subscribe(response =>{
      console.log(response);
      this.router.navigate(['ideasview']);
      localStorage.setItem('user',this.username);
    });
  }

  public register(u: User){
    console.log(u);
    return this.http.post(this.usersUrl+'/signup', u, this.settings);
  }

  public getPublicIdeas(){
      return this.http.get(this.ideasUrl+'/public');
  }

  public getIdeasByUser(uname: string){

    const body = {username: uname};

    return this.http.post(this.ideasUrl+'/own', body, this.settings);
  }

  public saveIdea(i: Idea){
    return this.http.post(this.ideasUrl, i, this.settings).subscribe(response =>{
      console.log(response);
    });
  }

  public logout(){
    return this.http.get(this.usersUrl+'/logout').subscribe(response =>{
      console.log(response);
      localStorage.removeItem('user');
    })
  }

  public removeIdea(ideaId: string){
    return this.http.delete(this.ideasUrl+'/'+ideaId, this.settings).subscribe(response=>{
      console.log(response);
    });
  }

}
