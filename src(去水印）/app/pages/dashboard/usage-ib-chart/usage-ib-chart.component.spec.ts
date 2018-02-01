import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageIbChartComponent } from './usage-ib-chart.component';

describe('UsageIbChartComponent', () => {
  let component: UsageIbChartComponent;
  let fixture: ComponentFixture<UsageIbChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageIbChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageIbChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
