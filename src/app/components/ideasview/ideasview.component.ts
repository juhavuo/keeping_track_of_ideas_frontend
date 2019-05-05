import { Component, OnInit } from '@angular/core';
import { BackendConnectorService} from '../../services/backend-connector.service';
import { Idea } from '../../models/idea';
import { Router } from '@angular/router';
import { Editideaparameters} from '../../models/Editideaparameters';

@Component({
  selector: 'app-ideasview',
  templateUrl: './ideasview.component.html',
  styleUrls: ['./ideasview.component.scss']
})
export class IdeasviewComponent implements OnInit {

  ideas: Idea[];
  currentuser: string = '';

  constructor(private backendConnectorService: BackendConnectorService, private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('token') == undefined){
      this.router.navigate(['login']);
    }

    this.currentuser = localStorage.getItem('user');
    this.fetchIdeas();
  }


  public fetchIdeas(){
    this.backendConnectorService.getIdeasByUser(this.currentuser).subscribe((results: Idea[])=>{
      if(results != undefined || results != null){
        this.ideas = results;
        console.log(this.ideas);
      }
    });
  }

  public goToAddIdea(){
    this.router.navigate(['addidea']);
  }

  public logout(){
    this.backendConnectorService.logout();
    this.router.navigate(['login']);
  }


  public editidea(idea: Idea){

    const user_id = localStorage.getItem('id');

    const editideaParameters = {
      title: idea.title,
      id : idea._id,
      details: idea.details,
      tags: idea.keywords,
      links: idea.links
    };

    const paramstring = JSON.stringify(editideaParameters);

    localStorage.setItem(user_id, paramstring);

    this.router.navigate(['editidea']);
  }

  public removeIdea(ideaId: string){
    console.log('idea to be removed: ' + ideaId);
    this.backendConnectorService.removeIdea(ideaId);
    this.fetchIdeas();
  }

  public changePrivacySetting(ideaId: string, private_currently: boolean){
    console.log('idea with id' + ideaId);
    const new_privacy_setting = !private_currently;
    this.backendConnectorService.changePrivacySetting(ideaId,new_privacy_setting);
    this.fetchIdeas();
  }

  public goToPublicIdeas(){
    this.router.navigate(['publicideas']);
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

}
