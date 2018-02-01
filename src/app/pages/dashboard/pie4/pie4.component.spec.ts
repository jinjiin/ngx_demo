import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pie4Component } from './pie4.component';

describe('Pie4Component', () => {
  let component: Pie4Component;
  let fixture: ComponentFixture<Pie4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pie4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pie4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
