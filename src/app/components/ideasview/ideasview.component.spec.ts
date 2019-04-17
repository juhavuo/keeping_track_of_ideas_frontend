import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasviewComponent } from './ideasview.component';

describe('IdeasviewComponent', () => {
  let component: IdeasviewComponent;
  let fixture: ComponentFixture<IdeasviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeasviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
