import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobarComponent } from './cobar.component';

describe('CobarComponent', () => {
  let component: CobarComponent;
  let fixture: ComponentFixture<CobarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
