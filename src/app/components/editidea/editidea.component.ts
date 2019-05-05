import { Component, OnInit } from '@angular/core';
import { Idea } from '../../models/idea';
import { Router } from '@angular/router';
import { BackendConnectorService} from '../../services/backend-connector.service';
import { Editideaparameters} from '../../models/Editideaparameters';

@Component({
  selector: 'app-editidea',
  templateUrl: './editidea.component.html',
  styleUrls: ['./editidea.component.scss']
})
export class EditideaComponent implements OnInit {

  user_id: string = '';
  ideaId: string = '';
  editideaParameters: Editideaparameters = {
    title: '',
    id : '',
    details: '',
    tags: [],
    links: []
  };
  linksAsString: string = '';
  tagsAsString: string = '';
  new_tagsAsString: string = '';
  new_linksAsString: string = '';
  new_edit_idea_parameters: Editideaparameters = {
    title: '',
    id : '',
    details: '',
    tags: [],
    links: []
  };


  constructor(private backendConnectorService: BackendConnectorService, private router: Router) { }

  ngOnInit() {

    this.user_id = localStorage.getItem('id');
    const jsonstring = localStorage.getItem(this.user_id);
    localStorage.removeItem(this.user_id);
    this.editideaParameters = JSON.parse(jsonstring);
    console.log(this.editideaParameters);
    this.tagsAsString = this.convertToList(this.editideaParameters.tags);
    this.linksAsString = this.convertToList(this.editideaParameters.links);
    console.log(this.tagsAsString);
    this.new_edit_idea_parameters.id = this.editideaParameters.id;

  }

  //to modify links and tags array in one string, using comma to separate them
  private convertToList(string_array: string[]){
    let builded_string = '';
    for(let i = 0; i < string_array.length;++i){
      builded_string += string_array[i];
      if(i<string_array.length-1){
        builded_string += ',';
      }
    }
    return builded_string;
  }

  //from comma separeted back to array
  private convertStringToList(list: string){
    return list.split(',');
  }

  //sends changes via backendconnector to backend
  public makeEdit(){
    this.new_edit_idea_parameters.tags = this.convertStringToList(this.new_tagsAsString);
    this.new_edit_idea_parameters.links = this.convertStringToList(this.new_linksAsString);
    console.log(this.new_edit_idea_parameters);
    this.backendConnectorService.editIdea(this.new_edit_idea_parameters.id,this.new_edit_idea_parameters.title,this.new_edit_idea_parameters.details,
      this.new_edit_idea_parameters.tags,this.new_edit_idea_parameters.links).subscribe(result =>{
        console.log(result);
      })
  }
}
