import { Component, OnInit } from '@angular/core';
import { BackendConnectorService} from '../../services/backend-connector.service';
import { Idea } from '../../models/idea';
import { Router } from '@angular/router';

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

  public removeIdea(ideaId){
    console.log('idea to be removed: ' + ideaId);
    this.backendConnectorService.removeIdea(ideaId);
    this.fetchIdeas();
  }

}
