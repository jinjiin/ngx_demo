import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiAxisComponent } from './multi-axis.component';

describe('MultiAxisComponent', () => {
  let component: MultiAxisComponent;
  let fixture: ComponentFixture<MultiAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
