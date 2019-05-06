import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { User } from '../models/user';
import { Idea } from '../models/idea';
import { Router} from '@angular/router';
import { Logininfo } from '../models/Logininfo';

@Injectable({
  providedIn: 'root'
})
export class BackendConnectorService {

  username: string;
  password: string;

  usersUrl = "https://env-XXXXXXX.jelastic.metropolia.fi/users";
  ideasUrl = "https://env-XXXXXXX.jelastic.metropolia.fi/ideas";

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

    this.http.post(this.usersUrl+'/login', body, this.settings).subscribe((response:Logininfo) =>{

      const token = response.token;
      const id = response.id;
      console.log(id);

      console.log(token);
      localStorage.setItem('token',token);
      localStorage.setItem('user', this.username);
      localStorage.setItem('id', id);
      this.router.navigate(['ideasview']);
    });
  }

  public register(u: User){
    console.log(u);
    return this.http.post(this.usersUrl+'/signup', u, this.settings);
  }

  public getPublicIdeas(){
      return this.http.get(this.ideasUrl+'/public');
  }


  public getIdeaById(ideaId: string){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    const body = {};

    return this.http.post(this.ideasUrl+'/'+ideaId,body, authSettings);
  }

  public getIdeasByUser(uname: string){
    //const authToken : string = 'Bearer 'localStorage.getItem('token');

    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};
    const b = {}; //empty body to fill the request slot
    console.log(this.settings);
    console.log(authSettings);
    return this.http.post(this.ideasUrl+'/own',b, authSettings);
  }

  public saveIdea(i: Idea){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    return this.http.post(this.ideasUrl, i, authSettings).subscribe(response =>{
      console.log(response);
    });
  }

  public logout(){
    return this.http.get(this.usersUrl+'/logout').subscribe(response =>{
      console.log(response);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
    })
  }

  public removeIdea(ideaId: string){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    return this.http.delete(this.ideasUrl+'/'+ideaId, authSettings).subscribe(response=>{
      console.log(response);
    });
  }

  public editIdea(ideaId: string, title: string, details: string, tags: string[], links: string[]){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};
    const body ={
      'title': title,
      'details': details,
      'tags': tags,
      'links': links
    }

    return this.http.patch(this.ideasUrl+'/'+ideaId+'/modifyIdea',body,authSettings);
  }

  public changePrivacySetting(ideaId: string, new_privacy_setting: boolean){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    const body = {is_private: new_privacy_setting};
    return this.http.patch(this.ideasUrl+'/'+ideaId+'/changeVisibility',body,authSettings).subscribe(response=>{
      console.log(response);
    });
  }

  public addLike(ideaId: string){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    const body = {};

    return this.http.patch(this.ideasUrl+'/'+ideaId+'/addLike',body,authSettings);
  }

  public addComment(ideaId: string, comment: string){
    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    const body = {'comment': comment };

    return this.http.patch(this.ideasUrl+'/'+ideaId+'/addComment',body,authSettings);

  }

  public removeComment(idea_id: string, commenter_id: string, comment_id: string){

    const authSettings = {headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('token',localStorage.getItem('token'))};

    const body = {
      'commenter_id': commenter_id,
      'comment_id': comment_id
    };

    return this.http.patch(this.ideasUrl+'/'+idea_id+ '/removeComment',body,authSettings);
  }

  public showPublicCommentsByTag(tag: string){

    return this.http.get(this.ideasUrl+'/public/searchByTag/'+tag);
  }

}
