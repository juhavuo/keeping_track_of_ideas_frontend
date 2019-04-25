import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicideasComponent } from './publicideas.component';

describe('PublicideasComponent', () => {
  let component: PublicideasComponent;
  let fixture: ComponentFixture<PublicideasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicideasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicideasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
