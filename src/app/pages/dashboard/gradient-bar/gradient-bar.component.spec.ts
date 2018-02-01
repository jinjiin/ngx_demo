import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientBarComponent } from './gradient-bar.component';

describe('GradientBarComponent', () => {
  let component: GradientBarComponent;
  let fixture: ComponentFixture<GradientBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
