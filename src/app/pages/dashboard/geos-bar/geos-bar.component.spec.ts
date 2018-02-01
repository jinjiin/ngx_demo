import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeosBarComponent } from './geos-bar.component';

describe('GeosBarComponent', () => {
  let component: GeosBarComponent;
  let fixture: ComponentFixture<GeosBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeosBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeosBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
