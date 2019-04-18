import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddideaComponent } from './addidea.component';

describe('AddideaComponent', () => {
  let component: AddideaComponent;
  let fixture: ComponentFixture<AddideaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddideaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddideaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
