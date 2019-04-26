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
    this.backendConnectorService.getPublicIdeas().subscribe((result: Idea[]) =>{
      if(result != undefined && result != null){
        this.public_ideas = result;

      }
    });
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

}
