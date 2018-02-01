import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValBarComponent } from './val-bar.component';

describe('ValBarComponent', () => {
  let component: ValBarComponent;
  let fixture: ComponentFixture<ValBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
