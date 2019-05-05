import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditideaComponent } from './editidea.component';

describe('EditideaComponent', () => {
  let component: EditideaComponent;
  let fixture: ComponentFixture<EditideaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditideaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditideaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
