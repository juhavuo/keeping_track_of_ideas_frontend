import { Component, OnInit } from '@angular/core';
import { BackendConnectorService} from '../../services/backend-connector.service';
import { Idea } from '../../models/idea';

@Component({
  selector: 'app-ideasview',
  templateUrl: './ideasview.component.html',
  styleUrls: ['./ideasview.component.scss']
})
export class IdeasviewComponent implements OnInit {

  ideas: Idea[];

  constructor(private backendConnectorService: BackendConnectorService) { }

  ngOnInit() {
    this.backendConnectorService.getPublicIdeas();

  }

}
