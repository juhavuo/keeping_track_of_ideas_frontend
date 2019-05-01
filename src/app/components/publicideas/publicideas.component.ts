import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../services/backend-connector.service';
import { Router } from '@angular/router';
import { Idea } from '../../models/idea';

@Component({
  selector: 'app-publicideas',
  templateUrl: './publicideas.component.html',
  styleUrls: ['./publicideas.component.scss']
})
export class PublicideasComponent implements OnInit {

  public_ideas: Idea[];

  constructor(private backendConnectorService: BackendConnectorService, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

  public logout(){
    this.backendConnectorService.logout();
    this.router.navigate(['login']);
  }

  public goToIdeas(){
    this.router.navigate(['ideasview']);
  }

  public showTitle(content: string[]){
    if(content.length == 0){
      return false;
    }else if(content.length > 1 || content[0].length > 0){
      return true;
    }else{
      return false;
    }
  }

  public fetchData(){
    const currentUser = localStorage.getItem('user');
    this.backendConnectorService.getPublicIdeas().subscribe((result: Idea[]) =>{
      if(result != undefined && result != null){
        this.public_ideas = result;
        let number_of_likes;
        for(let i = 0; i<this.public_ideas.length;++i){
          if(this.public_ideas[i].owner == currentUser){
            this.public_ideas[i].viewers_own = true;
          }else{
            this.public_ideas[i].viewers_own = false;
          }
          number_of_likes = 0;
          for(let j = 0; j<this.public_ideas[i].liked_by.length; ++j){
            ++number_of_likes
          }
          this.public_ideas[i].likes = number_of_likes;
        }
      }
    });
  }

  public addLike(userId: string){
    this.backendConnectorService.addLike(userId).subscribe(result =>{
      console.log(result);
      this.fetchData();
    });

  }

  public showButton(own: boolean, ids: string[]){

    const current_userId = localStorage.getItem('id');
    console.log(current_userId);
    let already_liked = false;
    for(let i = 0; i < ids.length; ++i){
      if(current_userId == ids[i]){
        already_liked = true;
        console.log('already liked');
        break;
      }
    }

    if(!own && !already_liked){
      return true;
    }else{
      return false;
    }

  }

}
