import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPnComponent } from './input-pn.component';

describe('InputPnComponent', () => {
  let component: InputPnComponent;
  let fixture: ComponentFixture<InputPnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
