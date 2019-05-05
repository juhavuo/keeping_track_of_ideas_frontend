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
  comment_text: string;
  tag_view_selected: boolean = false;
  fetched_tag: string = '';

  constructor(private backendConnectorService: BackendConnectorService, private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('token') == undefined){
      console.log('reroute to login');
      this.router.navigate(['login']);
    }

    this.comment_text = '';
    this.fetchData();
  }

  public logout(){
    this.backendConnectorService.logout();
    this.router.navigate(['login']);
  }

  public goToIdeas(){
    this.router.navigate(['ideasview']);
  }

  public showByTag(tag: string){
    const currentUser = localStorage.getItem('user');
    this.fetched_tag = tag;
    this.tag_view_selected = true;
    this.fetchDataWithTag(this.fetched_tag);
  }

  public reshowAllPublicIdeas(){
    this.fetchData();
    this.tag_view_selected = false;
  }

  //if there is no tags or links, one must not show the title for links or tags
  public showTitle(content: string[]){
    if(content.length == 0){
      return false;
    }else if(content.length > 1 || content[0].length > 0){
      return true;
    }else{
      return false;
    }
  }

  public fetchDataWithTag(tag: string){
    this.backendConnectorService.showPublicCommentsByTag(tag).subscribe((result: Idea[]) =>{
      if(result != undefined && result != null){
        this.public_ideas = result;
        let number_of_likes;
        for(let i = 0; i<this.public_ideas.length;++i){

          if(this.public_ideas[i].show_comments == undefined){
            this.public_ideas[i].show_comments = false;
          }
          if(this.public_ideas[i].show_add_comment == undefined){
            this.public_ideas[i].show_add_comment = false;
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

  //gets the public ideas data from the backend to show in html
  public fetchData(){
    const currentUser = localStorage.getItem('user');
    this.backendConnectorService.getPublicIdeas().subscribe((result: Idea[]) =>{
      if(result != undefined && result != null){
        this.public_ideas = result;
        let number_of_likes;
        for(let i = 0; i<this.public_ideas.length;++i){

          if(this.public_ideas[i].show_comments == undefined){
            this.public_ideas[i].show_comments = false;
          }
          if(this.public_ideas[i].show_add_comment == undefined){
            this.public_ideas[i].show_add_comment = false;
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

  //for adding like, after like is added, refetces the data to show correct amout of likes and
  //to make addjustments to ui (hides the like button from the liked idea)
  public addLike(userId: string){
    this.backendConnectorService.addLike(userId).subscribe(result =>{
      console.log(result);
      if(this.tag_view_selected){
        this.fetchDataWithTag(this.fetched_tag);
      }else{
        this.fetchData();
      }
    });
  }

  public addComment(idea_id: string){
    this.backendConnectorService.addComment(idea_id, this.comment_text).subscribe(result =>{
      console.log(result);
      this.hideCommentAdding(idea_id);
      if(this.tag_view_selected){
        this.fetchDataWithTag(this.fetched_tag);
      }else{
        this.fetchData();
      }
    });

  }

  public removeComment(idea_id: string, commenter_id: string, comment_id: string){
    this.backendConnectorService.removeComment(idea_id,commenter_id, comment_id).subscribe(result =>{
      console.log(result);
      if(this.tag_view_selected){
        this.fetchDataWithTag(this.fetched_tag);
      }else{
        this.fetchData();
      }
    });
  }

  //for html, the remove comments button is showed only, when comment is made by current user
  public show_remove_comments_b(commenter_id: string){
    const current_userId = localStorage.getItem('id');
    if(commenter_id == current_userId){
      return true;
    }else{
      return false;
    }
  }

  //for like button: shows button only, when one can like the idea
  //one can like idea if idea is not ones own and if one hasn't like it already
  public showLikebutton(owner_id: string, ids: string[]){

    const current_userId = localStorage.getItem('id');
    let already_liked = false;
    for(let i = 0; i < ids.length; ++i){
      if(current_userId == ids[i]){
        already_liked = true;
        break;
      }
    }

    if(!(owner_id == current_userId) && !already_liked){
      return true;
    }else{
      return false;
    }

  }

  //for button to show or hide comments
  public toggleComments(id: string){
    for(let i = 0; i<this.public_ideas.length; ++i){
      if(this.public_ideas[i]._id == id){
        this.public_ideas[i].show_comments = !this.public_ideas[i].show_comments;
        break;
      }
    }
  }

  //for showing the comments in html
  public showComments(show: boolean,comments: string[]){

    if(!show){
      return false;
    }else{
      if(comments.length > 0){
        return true;
      }else{
        return false;
      }
    }
  }

  //to show add comment section
  public showAddComment(id: String){
    for(let i = 0; i<this.public_ideas.length; ++i){
      if(this.public_ideas[i]._id == id){
        this.public_ideas[i].show_add_comment = true;
        break;
      }
    }
  }

  private hideCommentAdding(id: String){
    for(let i = 0; i<this.public_ideas.length; ++i){
      if(this.public_ideas[i]._id == id){
        this.public_ideas[i].show_add_comment = false;
        break;
      }
    }
  }

}
