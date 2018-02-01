import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumGeoComponent } from './sum-geo.component';

describe('SumGeoComponent', () => {
  let component: SumGeoComponent;
  let fixture: ComponentFixture<SumGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
