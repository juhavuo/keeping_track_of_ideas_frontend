import { Component, OnInit } from '@angular/core';
import { Idea } from '../../models/idea';
import { BackendConnectorService } from '../../services/backend-connector.service';

@Component({
  selector: 'app-addidea',
  templateUrl: './addidea.component.html',
  styleUrls: ['./addidea.component.scss']
})
export class AddideaComponent implements OnInit {

  idea: Idea = {
    _id: '',
    owner: 'default_1',
    is_private: true,
    title: '',
    details: '',
    keywords: [],
    time: '',
    links: []
  };

  linksAsString: string = '';
  tagsAsString: string = '';

  constructor(private backendConnectorService: BackendConnectorService) { }

  ngOnInit() {
  }

  public saveTheIdea(){

    const linksArray=this.linksAsString.split(',');
    const tagsArray=this.tagsAsString.split(',');
    this.idea.keywords = tagsArray;
    this.idea.links = linksArray;
    this.backendConnectorService.saveIdea(this.idea);
  }

}
